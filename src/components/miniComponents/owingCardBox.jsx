import React from 'react'
import styles from '../dashboard.module.css'

const OwingCardBox = ({amountOwing, amountOwed}) => {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.owCard}>
                    <h3 style={{fontSize: "19px", margin: 0}}>Amount Owed</h3>
                    <p style={{fontSize: "25px", fontWeight: "bold"}}>#{amountOwed}</p>  
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