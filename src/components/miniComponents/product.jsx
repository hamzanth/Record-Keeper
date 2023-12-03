import React, { useState, useEffect } from 'react'
import styles from '../product.module.css'

const Product = ({ product, changeQuantity, changeTotalPrice, createCartData, resetPrice, setResetPrice, limitExceeded, totalCostDebt, setTotalCostDebt, customer }) => {
  const [ quantity, setQuantity ] = useState(0)
  const [outOfStock, setOutOfStock] = useState(false)
  const [localTotal, setLocalTotal] = useState(0)

  useEffect(() => {
      // if(aboveLimit){
      //   dispLimitExceeded()
      // }

      if(resetPrice){
        resetLocalPrice()
      }
  }, [resetPrice])

  const increaseQuantity = () => {
    console.log(totalCostDebt + product.price - customer.amountOwed)
    if (totalCostDebt + product.price * 1 - customer.amountOwed > customer.debtLimit){
      alert(`YOu cannot exceed ${customer.debtLimit}`)
    }
    else{
      setQuantity(quantity + 1)
      changeQuantity(product, -1)
      changeTotalPrice(product.price, 1)
      createCartData(product, 1)
    }
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

  const dispLimitExceeded = () => {
    console.log("the limit has been exceeded in the product component")
    decreaseQuantity()
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

  const getImage = (prod) => {
    if (!prod.image){
      return (
        <div><img alt="No image found" /></div>
      )
    }
    else if (!prod.image.data){
      return (
        <div><img alt="No image found" /></div>
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

  const catgStyle = {
    fontStyle: "italic", 
    fontWeight: "normal", 
    fontSize: "17px",
    backgroundColor: "teal",
    color: "white",
    padding: "3px 5px",
    borderRadius: "1px"
  }

  return (
    <>
    <div className={styles.indProd}>
      <span className={styles.localPrice} style={{display: quantity === 0 ? "none" : "block"}}>#{quantity * product.price}</span>
      <span className={styles.quantityDisplay} style={{display: quantity === 0 ? "none" : "block"}}>{quantity}</span>
      <h2 className={styles.prodBod} style={{color: "black", marginTop: 0}}><span style={catgStyle}>{product.category}</span> {product.name}</h2>
      {/* <img className={styles.prodImage} src={"/productPictures/paper.jpeg"} alt="the image could not be found"/> */}
      {getImage(product)}
      <div style={{margin: "20px 0"}}>
        <div style={{display: "flex"}}>
          <span className={styles.det} style={{ display: "inline-block", marginRight: "30px"}}>Quantity: </span>
          <span className={styles.det}>{product.quantityRange} {product.quantity} {product.quantityDescription}</span>
        </div>
        <div style={{display: "flex"}}>
          <span className={styles.det} style={{ display: "inline-block", marginRight: "45px"}}>Price: </span>
          <span className={styles.det}>#{product.price} {product.priceDescription}</span>
        </div>
      </div>
      { outOfStock ? (
        <div>
          <h4>This product is currently out of stock</h4>
        </div>
      ): (
        <div>
          {limitExceeded ? (
            <h3>You cannot exceed the #{customer.debtLimit} limit</h3>
          ) : (
            <div>
              <button className={`${styles.btn} ${styles.plusStyle}`} style={{ display: product.quantity < 1 ? "none" : "inline-block"}} onClick={()=> increaseQuantity()}>+</button>
              <button style={{ display: quantity === 0 ? "none" : "inline-block"}} className={`${styles.btn} ${styles.minusStyle}`} onClick={() => decreaseQuantity()}>-</button>
            </div>
          )}  
        </div>
      )}
    </div>
    </>
  )
}

export default Product
