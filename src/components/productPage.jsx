import React, { useState, useEffect, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { CustomerContext } from '../context'
import Product from './miniComponents/product'
import styles from './product.module.css'
import ShoppingCart from './miniComponents/shoppingCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart' 

const Products = ({customer, setTotalDebt, setCustomerDetail, limitExceeded, setLimitExceeded}) => {

  const productCategory = ["All Categories", "food Stuff", "snacks", "ingredients", "drinks"]
  // const productionPublicKey = "pk_test_ed2321c55f182ec43ade54b4c155143f887e4075"

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    console.log("e.target.value is = " + e.target.value)
    console.log("searchterm is = " + searchTerm)
    // setProductDisplay(products)
    const newProducts = categoryChoice.toLowerCase() === "all categories" ? products : products.filter((prod) => prod.category.toLowerCase() === categoryChoice.toLowerCase())
    const newProducts2 = e.target.value.length === 0 ? newProducts : newProducts.filter((prod) => prod.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || prod.category.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    setProductDisplay(newProducts2)
  }

  const handleCategory = (category) => {
    setCategoryChoice(category)
    setSearchTerm("")
    const newProducts = category.toLowerCase() === "all categories" ? products : products.filter((prod) => prod.category.toLowerCase() === category.toLowerCase())
    setProductDisplay(newProducts)
  }

  const initialMonifyState = {
    currency: "NGN",
    reference: "" + Math.floor(Math.random() * 1000000000 + 1),
    customerName: customer.username,
    customerEmail: "monnify@monnify.com",
    customerMobileNumber: "08119059930",

  }

  const [products, setProduct] = useState([])
  const [productDisplay, setProductDisplay] = useState([])
  const [ searchTerm, setSearchTerm ] = useState("")
  const [categoryChoice, setCategoryChoice ] = useState("All Categories")
  const [showCategory, setShowCategory ] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  const [resetPrice, setResetPrice] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalCostDebt, setTotalCostDebt] = useState(0)
  // const [outOfStockArr, setOutOfStockArr] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:3000/products")
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setProduct(data.products)
      setProductDisplay(data.products)
      setIsLoading(false)
      setTotalCostDebt(customer.amountOwing)
    })
    .catch(error => {
      setError("Could not connect to the backend servers")
      setIsLoading(false)
    })
    if (customer.amountOwing >= customer.debtLimit){
      setLimitExceeded(true)
    }
    else{
      setLimitExceeded(false)
    }
  }, [])

  // const { saveTransaction } = useContext(CustomerContext)
  // const { customers } = useContext(CustomerContext)
  // const { setCustomers } = useContext(CustomerContext)

  const saveTransaction = (id, transObj, owing, owed) => {
    fetch("http://127.0.0.1:3000/products/addtotimeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: id, transObj: transObj, owing: owing, owed: owed, name:`${customer.username}(${customer.department})`})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setCustomerDetail(data.user)
      if (data.user.amountOwing === 1000){
        setLimitExceeded(true)
      } 
      setProduct(data.products)
      setProductDisplay(data.products)

    })
    .catch(error => {
      console.log(error)
    })
  }

  const changeQuantity = (product, quantity) => {
    const prods = [...productDisplay]

    const productIndex = prods.indexOf(product)
    const partProduct = prods[productIndex]
    const quant = partProduct.quantity + quantity
    const partProduct2 = {...partProduct, quantity: quant}
    prods[productIndex] = partProduct2
    // setProduct(prods)
    setProductDisplay(prods)
  }

  const changeTotalPrice = (price, quantityBought) => {
    const total = totalCost + price * quantityBought
    // console.log(`price ${price} : quantityBought ${quantityBought}: totalCost ${total}`)
    console.log(total + customer.amountOwing - customer.amountOwed)
    setTotalCostDebt(total + customer.amountOwing)
    if(total + customer.amountOwing - customer.amountOwed === customer.debtLimit) {
      setTotalCost(total)
      setLimitExceeded(true)
    }
    else if(total + customer.amountOwing - customer.amountOwed > customer.debtLimit) {
      // setLimitExceeded(true)
      // setAboveLimit(true)
      alert(`You cannot have debt above ${customer.debtLimit}`)
    }
    else{
      setTotalCost(total)
    }
  }
  const createCartData = (product, quantity) => {
    const productName = product.name
    const originalCart = {...cart}
    const cartItems = Object.keys(originalCart)
    if (cartItems.indexOf(product.name) === -1){
      const prodObj = {quantity: 1, price: product.price}
      originalCart[productName] = prodObj
    }
    else{
      originalCart[productName].quantity = originalCart[productName].quantity + quantity
      if (originalCart[productName].quantity === 0){
        delete originalCart[productName]
      }
    }
    // console.log(originalCart)
    setCart(originalCart)
  }

  const handleResetPrice = (change) => {
    setResetPrice(change)
  }

  const calculateTotalAmount = () => {
    let total = 0
    if(Object.keys(customer).length === 0){
      return 0
    }
    else{
    customer.transactions.map(tran => {
      Object.keys(tran.prods).map(pr => {
        total = total + tran.prods[pr].price * tran.prods[pr].quantity
      })
    })
    return total
    }
  }

  const buyProduct = () => {
    setTotalCost(0)
    setShowCart(false)
    setResetPrice(true)
    setProduct(productDisplay)
    let newOwed = null
    let newOwing = null
    // const totalAmt = calculateTotalAmount()
    // const netAmount =  - customer.amountOwed
    const newTransaction = {
         type: "sale",
         prod: cart,
         date: new Date(),
         cleared: false
       }

    if ((customer.amountOwed === 0) && (customer.amountOwing === 0)){
      saveTransaction(customer._id, newTransaction, totalCost, 0)
    }
    else{
      if (customer.amountOwed !== 0){
        const netAmount = totalCost - customer.amountOwed
        if (netAmount < 0){
          console.log("the amount is greater than ")
          newOwed = netAmount * -1
          newOwing = 0
          saveTransaction(customer._id, newTransaction, newOwing, newOwed)
        }
        else{
          newOwed = 0
          newOwing = netAmount
          saveTransaction(customer._id, newTransaction, newOwing, newOwed)
        }
      }
      else if (customer.amountOwing !== 0){
        newOwed = 0
        newOwing = totalCost + customer.amountOwing
        saveTransaction(customer._id, newTransaction, newOwing, newOwed)
      }
    }
    setCart({})
  }
  const discardProducts = () => {
    setTotalCost(0)
    setShowCart(false)
    setResetPrice(true)
    setProductDisplay(products)
    setLimitExceeded(false)
    setCart({})
  }

  const completePayment = () => {
    console.log("payment completed")
  }

  const closePayment = () => {
    console.log("payment close")
  }

  if(isLoading){
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <h1>Loading...</h1>
      </div>
    )
  }
  else{
    return (
      <div>
        {error ? (
          <div>
            <p style={{textAlign: "center"}}>{error}</p>
          </div>
        ) : (
          <div className={styles.gridContainer}>
          <div>
            <h2 style={{marginTop: 0}}>Select a Category</h2>
            <ul className={styles.categoryUl}>
              { productCategory.map((category) => (
                <li
                  style={{backgroundColor: categoryChoice === category && "goldenrod", color: categoryChoice === category && "white"}}
                  className={`${styles.categoryLi}`}
                  key={category}
                  onClick={() => handleCategory(category)}
                  >
                    {category}
                  </li>
              ))}
            </ul>
          </div>
          <div className={styles.productContainer}>
            <ShoppingCart
              customer={customer}
              cart={cart}
              totalCost={totalCost}
              setShowCart={setShowCart}
              buyProduct={buyProduct}
              discardProducts={discardProducts}
              showCart={showCart}
              setLimitExceeded={setLimitExceeded}
            />
            {/* <span className={styles.totalCost} onClick={() => setShowCart(!showCart)}>#{totalCost}</span> */}
            <div className={styles.totalCost} onClick={() => setShowCart(!showCart)}>
              <ShoppingCartIcon sx={{color: "goldenrod", fontSize: "50px"}} />
              <span style={{position: "absolute", top: "0px", right: "5px", padding: "4px", fontSize: "10px", fontWeight: "bold", color: "white", backgroundColor: "red", borderRadius: "50%"}}>{totalCost}</span>
            </div>
            <span className={styles.netCost}>{totalCost + customer.amountOwing - customer.amountOwed}</span>
            <input className={styles.searchInput} type="text" value={searchTerm} placeholder="Search for a product" onChange={handleChange} />
            <h2 className={styles.productHeading}>All Product</h2>
            { productDisplay.length !== 0 ? (
              <div className={styles.productGridContainer}>
                { productDisplay.map((prod) => (
                  <Product
                    key = {prod.name}
                    changeQuantity = {changeQuantity}
                    changeTotalPrice = {changeTotalPrice}
                    createCartData = {createCartData}
                    product = {prod}
                    resetPrice = {resetPrice}
                    setResetPrice = {setResetPrice}
                    limitExceeded={limitExceeded}
                    totalCostDebt={totalCostDebt}
                    setTotalCostDebt={setTotalCostDebt}
                    customer={customer}
                  />
                ))}
              </div>
            ): (
              <div>
                <p style={{textAlign: "center"}}>There are no products yet in the store</p>
              </div>
            ) }
          </div>
        </div>
        )}
      </div>
    )
  }

  // return (
  // <div className={styles.gridContainer}>
  //   {isLoading ? ( 
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  //   : (
  //     <div>
  //       {error ? (
  //         <div>
  //           <p style={{textAlign: "center"}}>{error}</p>
  //         </div>
  //       ) : (
  //         <div className="otherpart">
  //         <div>
  //           <h2 style={{marginTop: 0}}>Select a Category</h2>
  //           <ul className={styles.categoryUl}>
  //             { productCategory.map((category) => (
  //               <li
  //                 style={{backgroundColor: categoryChoice === category && "green", color: categoryChoice === category && "white"}}
  //                 className={`${styles.categoryLi}`}
  //                 key={category}
  //                 onClick={() => handleCategory(category)}
  //                 >
  //                   {category}
  //                 </li>
  //             ))}
  //           </ul>
  //         </div>
  //         <div className={styles.productContainer}>
  //           <ShoppingCart
  //             cart={cart}
  //             totalCost={totalCost}
  //             setShowCart={setShowCart}
  //             buyProduct={buyProduct}
  //             discardProducts={discardProducts}
  //             showCart={showCart}
  //           />
  //           <span className={styles.totalCost} onClick={() => setShowCart(!showCart)}>#{totalCost}</span>
  //           <input className={styles.searchInput} type="text" value={searchTerm} placeholder="Search for a product" onChange={handleChange} />
  //           <h2 className={styles.productHeading}>All Product</h2>
  //           { productDisplay.length !== 0 ? (
  //             <div className={styles.productGridContainer}>
  //               { productDisplay.map((prod) => (
  //                 <Product
  //                   key = {prod.name}
  //                   changeQuantity = {changeQuantity}
  //                   changeTotalPrice = {changeTotalPrice}
  //                   createCartData = {createCartData}
  //                   product = {prod}
  //                   resetPrice = {resetPrice}
  //                   setResetPrice = {setResetPrice}
  //                 />
  //               ))}
  //             </div>
  //           ): (
  //             <div>
  //               <p>There are no products yet in the store</p>
  //             </div>
  //           ) }
  //         </div>
  //       </div>
  //       )}
  //     </div>
  //   )}
    
  //   </div>
  // )
}

export default Products
