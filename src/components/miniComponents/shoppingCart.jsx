import React from 'react'
import styles from '../product.module.css'

const ShoppingCart = ({ cart, totalCost, setShowCart, buyProduct, discardProducts, showCart }) => {

  return (
    <>
      <div className={styles.shoppingCart} style={{display: showCart ? "block": "none"}}>
        <span className={styles.closeCart} onClick={() => setShowCart(false)}>x</span>
        <h3 style={{margin: "0 0 30px"}}>Shopping Cart</h3>
        {totalCost === 0 ? (
          <div>
            <h3>Your Cart is currently empty</h3>
          </div>
        ) : (
          <div>
            <table style={{width: "100%"}}>
              <thead>
                <tr>
                  <th className={styles.tableHeadData}>S/N</th>
                  <th className={styles.tableHeadData}>Product</th>
                  <th className={styles.tableHeadData}>Quantity</th>
                  <th className={styles.tableHeadData}>Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart).map((key, index) => (
                    <tr key={index}>
                      <td className={styles.tableBodyData}><span>{index + 1}</span></td>
                      <td className={styles.tableBodyData} style={{paddingRight: "50px"}}>
                        <span style={{fontStyle: "italic", fontSize: "18px"}}>{key}(#{cart[key].price})</span>
                      </td>
                      <td className={styles.tableBodyData}>
                        <span style={{fontStyle: "italic", fontSize: "18px"}}>{cart[key].quantity}</span>
                      </td>
                      <td className={styles.tableBodyData}><span>#{cart[key].quantity * cart[key].price}</span></td>
                    </tr>
                ))}
                <tr>
                <td style={{ textAlign: "right"}}>
                <span style={{color: "red", textAlign: "left", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", textDecoration: "underline"}}>Total</span>
                </td>
                  <td style={{ textAlign: "right"}} colSpan="3">
                  <span style={{color: "red", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", textDecoration: "underline"}}>#{totalCost}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{marginTop: "40px"}}>
              <button type="button" style={{backgroundColor: "red", color: "white", marginRight: "30px"}} onClick={discardProducts}>Discard</button>
              <button type="button" style={{backgroundColor: "darkgreen", color: "white"}} onClick={buyProduct}>Buy</button>
            </div>
          </div>
        ) }
      </div>
    </>
  )
}

export default ShoppingCart
