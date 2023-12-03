import React, { useEffect, useState } from 'react'
import styles from '../dashboard.module.css'

const SingProduct = ({handleShowProductDetail, prod}) => {
    const [ image, setImage ] = useState("null")
    const getImage = (prod) => {
      if (!prod.image){
        return (
          <div style={{height: "136px"}}><img alt="No image found" /></div>
        )
      }
      else if (!prod.image.data){
        return (
          <div style={{height: "136px"}}><img alt="No image found" /></div>
        )
      }
      else{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(prod.image.data.data)))
        const imgStyle = {width: "100%", height: "130px"}
        return (
          <div>
            <img style={imgStyle} src={`data:image/jpg;base64, ${base64String}`} />
          </div>
        )
      }
    }
    return (
        <>
            <div className={styles.prodCard}>
                {getImage(prod)}
                <div>
                  <h3 style={{fontWeight: "bold", textAlign: "center"}}>{prod.name}</h3>
                </div>
                <div style={{display: "flex"}}>
                  <p style={{fontWeight: "bold", fontStyle: "italic", margin: "0 40px 0 0"}}>Price</p>
                  <p style={{fontWeight: "bold", textAlign: "center", margin: "0 40px 0 0"}}>{prod.price} {prod.priceDescription}</p>
                </div>
                <div style={{display: "flex"}}>
                  <p  style={{fontStyle: "italic", fontWeight: "bold", margin: "0 40px 0 0"}}>Quantity</p>
                  <p style={{fontWeight: "bold", textAlign: "center", margin: "0 40px 0 0", fontSize: "13px"}}>{prod.quantityRange} {prod.quantity} {prod.quantityDescription}</p>
                </div>
                <button onClick={() => handleShowProductDetail(prod)} className={styles.prodCardBtn}>Edit</button>
            </div>
        </>
    )
}

export default SingProduct