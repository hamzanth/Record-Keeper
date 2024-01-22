import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'

const OwingCustomers = ({customers}) => {
    return (
        <>
            <div>
                <h4 style={{textAlign: "center"}}>List of Customers that are owing</h4>
                {customers ? (
                    customers.filter(cust => cust.amountOwing > 0).map(customer => (
                        <div key={customer._id} className={styles.indCustStyle}>
                            <Link className={styles.customerLink} style={{fontSize: "19px"}} to={"/customers/" + customer._id}>{customer.username}</Link>
                            <span className={styles.owNumber}>{customer.amountOwing}</span>
                        </div>
                    ))
                ):(
                    <div>
                        <h2 style={{textAlign: "center"}}>Loading</h2>
                    </div>
                )  }
            </div>
        </>
    )
}

export default OwingCustomers