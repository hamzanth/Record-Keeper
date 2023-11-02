import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import ProductForm from './miniComponents/productForm'
import DashSideMenu from './miniComponents/dashSideMenu'
import styles from './dashboard.module.css'
import CustomerForm from './miniComponents/customerForm'
import EditProduct from './miniComponents/editProduct'
import TransHistory from './miniComponents/transHistory'
import AllCustomers from './miniComponents/allCustomers'
import OwingCustomers from './miniComponents/owingCustomers'
import OwedCustomers from './miniComponents/owedCustomers'
import OwingCardBox from './miniComponents/owingCardBox'
import SingProduct from './miniComponents/singProduct'
import TopCustomers from './miniComponents/topCustomers'
import TopProducts from './miniComponents/topProducts'

const AdminDashBoard = () => {

  const [ showProductForm, setShowProductForm ] = useState(false)
  const [ showCustomerForm, setShowCustomerForm ] = useState(false)
  const [ selectedNav, setSelectedNav ] = useState("OverView")
  const [ products, setProducts ] = useState(null)
  const [ customers, setCustomers ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ showProductDetail, setShowProductDetail ] = useState(false)
  const [ selectedProduct, setSelectedProduct ] = useState({})
  const [ amountOwing, setAmountOwing ] = useState(0)
  const [ amountOwed, setAmountOwed ] = useState(0)
  const [ debtLimit, setDebtLimit ] = useState(0)

  const calcTotal = (users) => {
    console.log("the user is ")
    console.log(users)
    
  }

  useEffect(() => {
    fetch("http://127.0.0.1:3000/products")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setProducts(data.products)
      // setIsLoading(false)
    })
    .catch(error => {
      setError("Could not connect to the backend servers")
      setIsLoading(false)
    })

    fetch("http://127.0.0.1:3000/accounts/users")
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      let totalOwed = 0
      let totalOwing = 0
      data.users.map(uss => {
        totalOwed = totalOwed + uss.amountOwed
      })
      data.users.map(uss => {
        totalOwing = totalOwing + uss.amountOwing
      })
      setAmountOwed(totalOwing)
      setAmountOwing(totalOwed)
      console.log("The general limit is " + data.users[0].debtLimit)
      setDebtLimit(data.users[0].debtLimit)
      data.users ? setCustomers(data.users) : setError(error)
    })
    .catch(error => {
      if (error){
        setError(error)
        console.log(error)
      }
    })

  }, [])

  const handleMakeAdmin = (customer) => {
    const id = customer._id
    fetch("http://127.0.0.1:3000/accounts/make-admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({id: id, role: "admin"})
    })
    .then(resp => resp.json())
    .then(data => {
      const customerClone = [...customers]
      const index = customerClone.indexOf(customer)
      customerClone[index] = data.user
      setCustomers(customerClone)
    })
    .catch(error => setError(error))
  }

  const handleMakeBasic = (customer) => {
    const id = customer._id
    fetch("http://127.0.0.1:3000/accounts/make-basic", {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({id: id, role: "basic"})
    })
    .then(resp => resp.json())
    .then(data => {
      const customerClone = [...customers]
      const index = customerClone.indexOf(customer)
      customerClone[index] = data.user
      setCustomers(customerClone)
    })
    .catch(error => setError(error))
  }

  const handleShowProductForm = (e) => {
    e.preventDefault() 
    setShowProductForm((showProductForm) => !showProductForm)
  }
  const handleShowProductDetail = (prod) => {
    setSelectedProduct(prod)
    setShowProductDetail(showProductDetail => !showProductDetail)
  }
  const handleCustShow = () => {
    setShowCustomerForm(showCustomerForm => !showCustomerForm)
  }
  const updateCustomers = (user) => {
    const newCustomers = [...customers, user]
    setCustomers(newCustomers)
    setShowCustomerForm(false)
  }
  const updateProducts = (product) => {
    const newProducts = [...products, product]
    setProducts(newProducts)
    setShowProductForm(false)
  }

  const editProductList = (oldProduct, newProduct) => {
    const productClone = [...products]
    const index = productClone.indexOf(oldProduct)
    productClone[index] = newProduct
    setProducts(productClone)
    setShowProductDetail(false)
  }

  const updateOwedCustomers = (oldCustomer, newCustomer) => {
    const customerClone = [...customers]
    const index = customerClone.indexOf(oldCustomer)
    customerClone[index] = newCustomer
    setCustomers(customerClone)
  }

  const deleteProductList = (oldProduct) => {
    const newProducts = products.filter(prod => prod._id !== oldProduct._id)
    setProducts(newProducts)
    setShowProductDetail(false)
  }
  const handleUpdateCustomer = (selCust, updateObj) => {
    fetch(`http://127.0.0.1:3000/accounts/${selCust._id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: updateObj.username, 
        password: updateObj.password, 
        department: updateObj.department,
        image: updateObj.image
      })
    })
    .then(resp => resp.json())
    .then(data => {
      const customerClone = [...customers]
      const index = customerClone.indexOf(selCust)
      customerClone[index] = data.user
      setCustomers(customerClone)
    })
    .catch(error => {
      console.log(error)
    })
  }
  const handleDeleteCustomer = (selCust) => {
    fetch(`http://127.0.0.1:3000/accounts/${selCust._id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.message)
      const newCustomers = customers.filter(cust => cust._id !== data.user._id)
      setCustomers(newCustomers) 
    })
  }
  const sideMenuList = [
    {name: "OverView", id: 0},
    {name: "Customers", id: 1},
    {name: "Products", id: 3}
  ]

  return (
    <>
      {showProductDetail && (
        <EditProduct 
        selectedProduct={selectedProduct}
        setShowProductDetail={setShowProductDetail}
        editProductList={editProductList}
        deleteProductList={deleteProductList}
      />
      )}

      <div className={styles.dashboardContainer}>
        <ul className={styles.ulStyles}>
          {sideMenuList.map(sideItem => (
            <li 
              className={styles.liStyles} 
              key={sideItem.id} 
              style={{backgroundColor: selectedNav === sideItem.name && "rgb(42, 42, 94)"}}
              onClick={() => setSelectedNav(sideItem.name)}  
            >
              <DashSideMenu 
                menuItem={sideItem}
              />
            </li>
          ))}
        </ul>
        <div className={styles.mainSection}>
          <h2 style={{color: "black", textAlign: "center", fontSize: "35px"}}>Admin Dashboard</h2>
        <div style={{display: selectedNav === "Products" ? "block" : "none" }}>
          <div style={{textAlign: "center", marginTop: "30px"}}>
          <button className={styles.productFormButton} type="button" onClick={handleShowProductForm}>Show Product Form</button>
          </div>
          <div className={styles.prodContainer}>
            {products && products.map(prod => (
              <SingProduct 
                key={prod._id}
                handleShowProductDetail={handleShowProductDetail}
                prod={prod}
              />
            ))}
          </div>
          <ProductForm 
            unDisplayForm={() => setShowProductForm(showProductForm => !showProductForm)}
            showProductForm={showProductForm}
            updateProducts={updateProducts}
          />
        </div>

        <div style={{display: selectedNav === "OverView" ? "block" : "none" }}>
          <h2 style={{textAlign: "center"}}>General Overview</h2>
          <OwingCardBox 
            amountOwing={amountOwing}
            amountOwed={amountOwed}
            debtLimit={debtLimit}
            setDebtLimit={setDebtLimit}
          />
          <div className={styles.overViewBox}>
            <TransHistory />
            <TopProducts />
            <TopCustomers />
          </div>
        </div>
        <div style={{display: selectedNav === "Customers" ? "block" : "none" }}>
          <h2 style={{textAlign: "center"}}>Customers section</h2>
          <div style={{textAlign: "center"}}>
            <button className={styles.productFormButton} type="button" onClick={() => setShowCustomerForm(true)}>Add a Customer</button>
          </div>
          <div className={styles.customerFormStyle} style={{display: showCustomerForm ? "block" : "none", border: "3px solid teal", borderRadius: "4px"}}>
            <CustomerForm 
              unCustForm={handleCustShow}
              updateCustomers={updateCustomers}
            />
          </div>
          <div className={styles.customerBox}>
            <AllCustomers 
              customers={customers}
              handleMakeBasic={handleMakeBasic}
              handleMakeAdmin={handleMakeAdmin}
              handleUpdateCustomer={handleUpdateCustomer}
              handleDeleteCustomer={handleDeleteCustomer}
            />
            <OwingCustomers 
              customers={customers}
            />
            <OwedCustomers 
              customers={customers}
              updateOwedCustomers={updateOwedCustomers}
            />
          </div>
        </div>

        </div>
      </div>
    </>
  )
}

export default AdminDashBoard
