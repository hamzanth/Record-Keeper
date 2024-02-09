import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { CustomerContext } from '../context'
import styles from './customer.module.css'
import NavBar from './miniComponents/navBar'

const Customers = () => {

  const [customers, setCustomers] = useState([])
  const [errors, setErrors] = useState(null)
  const [partCustomer, setPartCustomer] = useState(null)
  const [decToken, setDecToken] = useState(null)

  useEffect(() => {
    const jwtToken = localStorage.getItem("token")
    try{
      const decodedToken = jwtDecode(jwtToken)
      console.log(decodedToken)

      setDecToken(decodedToken)
    }
    catch(error){
      console.log(error)
    }

    // const decodedtoken = jwtDecode(localStorage.getItem("token")) 
    // "http://127.0.0.1:3000/accounts/users"
    // "https://record-keeper-api.onrender.com/accounts/users"
    fetch("https://record-keeper-api.onrender.com/accounts/users")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      data.users ? setCustomers(data.users) : setErrors(data.error)
    })
    .catch(error => {
      if (error){
        setErrors(error)
        console.log(error)
      }
    })
  }, [])

  const handleMakeAdmin = (id) => {
    console.log(id)
    fetch("https://record-keeper-api.onrender.com/accounts/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({id: id, role: "admin"})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.message)
    })
  }
  // const [customers, setCustomers] = useState(initialCustomers)
  // const { customers, setCustomers } = useContext(CustomerContext)
  // const saveTransaction = (customer, transaction) => {
  //   const customs = [...customers]
  //   const customerIndex = customs.indexOf(customer)
  //   const partCustomer = customs[customerIndex]
  //   const partCustomer2 = [...partCustomer.transactions, transactions]
  //   customs[customerIndex] = partCustomer2
  //   setCustomers(customs)
  // }
  return (
    <>
      <NavBar />
      {!decToken || decToken.role === "basic" ? (
        <div style={{marginTop: "10%"}}>
          <p style={{textAlign: "center"}}>Your are not authorized to view this page</p>
        </div>
      ) : (
        <div className={styles.customerContainer} style={{marginTop: "13%"}}>
        <h2 style={{textAlign: "center"}}>Customer's page</h2>
        {errors ? (
          <h3 style={{textAlign: "center"}}>There was error while loading the data</h3>
        ): (
          <div>
            { customers.filter(customer => customer.role !== "super").map((customer) => (
              <div className={styles.custdivStyle} style={{textAlign: "center"}} key={customer._id}>
                <Link className={styles.custsStyle} to={"/customers/" + customer._id}>
                  <h3><span style={{borderBottom: "2px solid black", display: "inline-block", width: "50%", padding: "15px"}}>{customer.username}</span></h3>
                </Link>

                  {/* <button style={{ display: decToken.role === "super" ? "inline-block" : "none"}} type="button" onClick={() => handleMakeAdmin(customer._id)}>make admin</button> */}
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </>
  )
}

export default Customers
