import React, {useState, useContext} from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { CustomerContext } from '../context'
import styles from './customer.module.css'

const Customers = () => {

  // const [customers, setCustomers] = useState(initialCustomers)
  const { customers, setCustomers } = useContext(CustomerContext)
  const saveTransaction = (customer, transaction) => {
    const customs = [...customers]
    const customerIndex = customs.indexOf(customer)
    const partCustomer = customs[customerIndex]
    const partCustomer2 = [...partCustomer.transactions, transactions]
    customs[customerIndex] = partCustomer2
    setCustomers(customs)
  }
  return (
    <>
      <div className={styles.customerContainer}>
        <h2>This is the Customer's page</h2>
        { customers.map((customer, index) => (
          <div key={index}>
            <Link to={"/customers/" + index}>
              <h3>{customer.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Customers
