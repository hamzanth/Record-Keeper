import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { CustomerContext } from '../context'
import styles from './customer.module.css'

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
    fetch("http://127.0.0.1:3000/accounts/users")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      data.users ? setCustomers(data.users) : setErrors(error)
    })
    .catch(error => {
      if (error){
        setErrors(error)
        console.log(error)
      }
    })
  }, [])

  const handleMakeAdmin = (id) => {
    fetch("http://127.0.0.1:3000/accounts/update", {
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
      {!decToken ? (
        <div>
          <p>Your are not authorized to view this page</p>
        </div>
      ) : (
        <div className={styles.customerContainer}>
        <h2>This is the Customer's page</h2>
        {errors ? (
          <h3>There was error while loading the data</h3>
        ): (
          <div>
            { customers.filter(customer => customer.role !== "admin").map((customer) => (
              <div key={customer._id}>
                <Link to={"/customers/" + customer._id}>
                  <h3>{customer.username}</h3>
                </Link>

                  <button style={{ display: "inline-block"}} type="button" onClick={() => handleMakeAdmin(customer._id)}>make admin</button>
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
