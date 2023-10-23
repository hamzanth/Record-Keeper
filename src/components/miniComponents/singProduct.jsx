import React from 'react'
import styles from '../dashboard.module.css'

const SingProduct = ({handleShowProductDetail, prod}) => {

    return (
        <>
            <div className={styles.prodCard}>
                <div>
                  <h3 style={{fontWeight: "bold", textAlign: "center"}}>{prod.name}</h3>
                </div>
                <div style={{display: "flex"}}>
                  <p style={{fontWeight: "bold", fontStyle: "italic", margin: "0 40px 0 0"}}>Price</p>
                  <p style={{fontWeight: "bold", textAlign: "center", margin: "0 40px 0 0"}}>{prod.price}</p>
                </div>
                <div style={{display: "flex"}}>
                  <p  style={{fontStyle: "italic", fontWeight: "bold", margin: "0 40px 0 0"}}>Quantity</p>
                  <p style={{fontWeight: "bold", textAlign: "center", margin: "0 40px 0 0"}}>{prod.quantity}</p>
                </div>
                <button onClick={() => handleShowProductDetail(prod)} className={styles.prodCardBtn}>Edit</button>
            </div>
        </>
    )
}

export default SingProduct