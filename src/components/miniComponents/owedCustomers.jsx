import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'

const OwedCustomers = ({ customers, updateOwedCustomers }) => {
    const [ customerClicked, setCustomerClicked ] = useState(null)
    const [ displayModal, setDisplayModal ] = useState(false)
    const [ changeInput, setChangeInput ] = useState(null)

    const handleAmountClicked = (cust) => {
        setCustomerClicked(cust)
        setChangeInput(cust.amountOwed)
        setDisplayModal(displayModal => !displayModal)
    }

    const handlePayOff = async () => {
        let amountOwing
        let amountOwed
        if(changeInput > customerClicked.amountOwed){
            amountOwing = changeInput - customerClicked.amountOwed
            amountOwed = 0
        }
        else if(changeInput < customerClicked.amountOwed){
            amountOwed = customerClicked.amountOwed - changeInput
            amountOwing = 0
        }
        else{
            amountOwed = 0
            amountOwing = 0
        }
        await fetch("https://record-keeper-api.onrender.com/products/" + customerClicked._id + "/pay-owed", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({amountOwing: amountOwing, amountOwed: amountOwed})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            updateOwedCustomers(customerClicked, data.user)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            <div>
                {displayModal && (
                <div className={styles.owModal}>
                    <span onClick={() => setDisplayModal(false)}>x</span>
                    <p>change some settings {customerClicked.amountOwed}</p>
                    <input type="number" value={changeInput} onChange={(e) => setChangeInput(e.target.value)} />
                    <button onClick={handlePayOff}>pay off</button>
                </div>
                )}
                <h4 style={{textAlign: "center"}}>List of Customers that are Owed</h4>
                {customers ? (
                    customers.filter(cust => cust.amountOwed > 0).map(customer => (
                        <div key={customer._id} className={styles.indCustStyle}>
                            <Link className={styles.customerLink} style={{fontSize: "19px"}} to={"/customers/" + customer._id}>{customer.username}</Link>
                            <span onClick={() => handleAmountClicked(customer)} className={styles.owNumber} style={{backgroundColor: "#4caf50", cursor: "pointer"}}>{customer.amountOwed}</span>
                        </div>
                    ))
                ):(
                    <div>
                        <h2 style={{textAlign: "center"}}>Loading...</h2>
                    </div>
                ) }
            </div>
        </>
    )
}

export default OwedCustomers