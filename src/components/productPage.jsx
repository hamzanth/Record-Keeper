import React, { useState, useEffect, useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CustomerContext } from '../context'
import Product from './miniComponents/product'
import styles from './product.module.css'
import ShoppingCart from './miniComponents/ShoppingCart'

const Products = ({customer, setTotalDebt}) => {
  const initialState = [
    {
      category: "Snacks",
      name: "groundnut",
      quantity: 4,
      price: 20,
      image: "/productPictures/scissors.jpeg"
    },
    {
      category: "Snacks",
      name: "Choco Rings",
      quantity: 2,
      price: 60,
      image: "/productPictures/paper.jpeg"
    },
    {
      category: "Snacks",
      quantity: 7,
      name: "Pale G",
      price: 60,
      image: "/productPictures/rock.jpeg"
    },
    {
      category: "Food Stuff",
      name: "Spaghetti",
      quantity: 1,
      price: 600,
      image: "/productPictures/paper.jpeg"
    },
  ]

  const productCategory = ["All Categories", "food Stuff", "snacks", "ingredients", "drinks"]

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

  const [products, setProduct] = useState(initialState)
  const [productDisplay, setProductDisplay] = useState(initialState)
  const [ searchTerm, setSearchTerm ] = useState("")
  const [categoryChoice, setCategoryChoice ] = useState("All Categories")
  const [showCategory, setShowCategory ] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  const [resetPrice, setResetPrice] = useState(false)
  // const [outOfStockArr, setOutOfStockArr] = useState([])

  const { saveTransaction } = useContext(CustomerContext)
  const { customers } = useContext(CustomerContext)
  const { setCustomers } = useContext(CustomerContext)

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
    setTotalCost(total)
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
      saveTransaction(customer, newTransaction, totalCost, 0)
    }
    else{
      if (customer.amountOwed !== 0){
        const netAmount = totalCost - customer.amountOwed
        if (netAmount < 0){
          console.log("the amount is greater than ")
          newOwed = netAmount * -1
          newOwing = 0
          saveTransaction(customer, newTransaction, newOwing, newOwed)
        }
        else{
          newOwed = 0
          newOwing = netAmount
          saveTransaction(customer, newTransaction, newOwing, newOwed)
        }
      }
      else if (customer.amountOwing !== 0){
        newOwed = 0
        newOwing = totalCost + customer.amountOwing
        saveTransaction(customer, newTransaction, newOwing, newOwed)
      }
    }

    // if (netAmount > 0){
      // const allCustomersClone = [...customers]
      // const customerIndex = allCustomersClone.indexOf(customer)
      // const customerClone = {...customer}
      // customerClone.amountOwed = 0
      // allCustomersClone[customerIndex] = customerClone
      // setCustomers(allCustomersClone)
      // const newOwed = 0
      // saveTransaction(customer, cart, newOwed)
      // setTotalDebt(netAmount - totalCost)
    // }
    // else if (netAmount < 0){
      // const allCustomersClone = [...customers]
      // const customerIndex = allCustomersClone.indexOf(customer)
      // const customerClone = {...customer}
      // customerClone.amountOwed = customer.amountOwed - totalAmt
      // allCustomersClone[customerIndex] = customerClone
      // console.log(allCustomersClone)
      // setCustomers(allCustomersClone)
      // const newOwed = customer.amountOwed - to
      // console.log(`newOwed = ${customer.amountOwed} - ${totalAmt}`)
      // saveTransaction(customer, cart, newOwed)
      // setTotalDebt(0)
    // }
    // else{
      // const allCustomersClone = [...customers]
      // const customerIndex = allCustomersClone.indexOf(customer)
      // const customerClone = {...customer}
      // customerClone.amountOwed = 0
      // allCustomersClone[customerIndex] = customerClone
      // setCustomers(allCustomersClone)
    //   const newOwed = 0
    //   saveTransaction(customer, cart, newOwed)
    //   setTotalDebt(0)
    // }
    setCart({})
  }
  const discardProducts = () => {
    setTotalCost(0)
    setShowCart(false)
    setResetPrice(true)
    setProductDisplay(products)
    setCart({})
  }
  return (
  <div className={styles.gridContainer}>
    <div>
      <h2 style={{marginTop: 0}}>Select a Category</h2>
      <ul className={styles.categoryUl}>
        { productCategory.map((category) => (
          <li
            style={{backgroundColor: categoryChoice === category && "green", color: categoryChoice === category && "white"}}
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
        cart={cart}
        totalCost={totalCost}
        setShowCart={setShowCart}
        buyProduct={buyProduct}
        discardProducts={discardProducts}
        showCart={showCart}
      />
      <span className={styles.totalCost} onClick={() => setShowCart(!showCart)}>#{totalCost}</span>
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
            />
          ))}
        </div>
      ): (
        <div>
          <p>There are no products yet in the store</p>
        </div>
      ) }
    </div>
    </div>
  )
}

export default Products
