import React, { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'

const OwingCardBox = ({amountOwing, amountOwed, debtLimit, setDebtLimit}) => {
    const [ debtInput, setDebtInput ] = useState(debtLimit)

    useEffect(() => {
        setDebtInput(debtLimit)
        console.log("The debt limit is " + debtLimit)
    }, [debtLimit])

    const handleDebtUpdate = async (e) => {
        e.preventDefault()
        await fetch(`http://127.0.0.1:3000/accounts/debt-limit-update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({debt: debtInput})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            setDebtLimit(debtInput)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.owCard}>
                    <h3 style={{fontSize: "19px", margin: 0}}>Amount Owed</h3>
                    <p style={{fontSize: "25px", fontWeight: "bold"}}>#{amountOwed}</p>  
                </div>
                <div className={styles.debtLimitStyle}>
                    <h3 style={{textAlign: "center", margin: "0 0 0px"}}>Debt Limit</h3>
                    <form>
                        <input style={{fontSize: "19px", border: "2px solid grey"}} type="number" value={debtInput} onChange={(e) => setDebtInput(e.target.value)} />
                        <button style={{fontSize: "16px", padding: "6px 5px"}} onClick={handleDebtUpdate}>update</button>
                    </form>
                </div>
                <div className={styles.owCard}>
                    <h3 style={{fontSize: "19px", margin: 0}}>Amount Owing</h3>
                    <p style={{fontSize: "25px", fontWeight: "bold"}}>#{amountOwing}</p>
                </div>
            </div>
        </>
    )
} 

export default OwingCardBox