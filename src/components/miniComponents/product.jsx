import React, { useState, useEffect } from 'react'
import styles from '../product.module.css'

const Product = ({ product, changeQuantity, changeTotalPrice, createCartData, resetPrice, setResetPrice }) => {
  const [ quantity, setQuantity ] = useState(0)
  const [outOfStock, setOutOfStock] = useState(false)
  const [localTotal, setLocalTotal] = useState(0)

  useEffect(() => {
      if(resetPrice){
        resetLocalPrice()
      }
  }, [resetPrice])

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
    changeQuantity(product, -1)
    changeTotalPrice(product.price, 1)
    createCartData(product, 1)
    // if (product.quantity < 2){
    //   setOutOfStock(true)
    // }
  }
  const decreaseQuantity = () => {
    if (quantity > 0){
      setQuantity(quantity - 1)
      changeQuantity(product, 1)
      changeTotalPrice(product.price, - 1)
      createCartData(product, - 1)
    }
  }

  const resetLocalPrice = () => {
    setQuantity(0)
    setResetPrice(false)
    // if (cart[product.name].quantity === 0){
    //     setOutOfStock(true)
    // }
    if (product.quantity < 1){
      setOutOfStock(true)
    }
  }

  return (
    <>
    <div className={styles.indProd}>
      <span className={styles.localPrice} style={{display: quantity === 0 ? "none" : "block"}}>#{quantity * product.price}</span>
      <span className={styles.quantityDisplay} style={{display: quantity === 0 ? "none" : "block"}}>{quantity}</span>
      <h2 className={styles.prodBod} style={{color: "black", marginTop: 0}}>{product.name}</h2>
      <img className={styles.prodImage} src={product.image} alt="the image could not be found"/>
      <div style={{margin: "20px 0"}}>
        <div style={{display: "flex"}}>
          <span className={styles.det} style={{ display: "inline-block", marginRight: "30px"}}>Quantity: </span>
          <span className={styles.det}>{product.quantity}</span>
        </div>
        <div style={{display: "flex"}}>
          <span className={styles.det} style={{ display: "inline-block", marginRight: "45px"}}>Price: </span>
          <span className={styles.det}>#{product.price}</span>
        </div>
      </div>
      { outOfStock ? (
        <div>
          <h4>This product is currently out of stock</h4>
        </div>
      ): (
        <div>
          <button className={`${styles.btn} ${styles.plusStyle}`} style={{ display: product.quantity < 1 ? "none" : "inline-block"}} onClick={()=> increaseQuantity()}>+</button>
          <button style={{ display: quantity === 0 ? "none" : "inline-block"}} className={`${styles.btn} ${styles.minusStyle}`} onClick={() => decreaseQuantity()}>-</button>
        </div>
      )}
    </div>
    </>
  )
}

export default Product
