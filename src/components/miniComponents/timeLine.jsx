import React from 'react'
import styles from '../customer.module.css'

const TimeLine = ({transaction, higherIndex, customerDetail}) => {

  const calculateIndAmount = (index) => {
    let total = 0
    const transaction = customerDetail.timeLine[index]
    // console.log(transaction)
    Object.keys(transaction.prods).map(product => {
      total = total + transaction.prods[product].price * transaction.prods[product].quantity
    })
    return total
  }

  if(transaction.type === "sale"){
    return (
      <>
      <table key={higherIndex} style={{width: "100%", position: "relative"}}>
        <p className={styles.clearDebt} style={{display: transaction.cleared ? "block" : "none"}}>CLEARED</p>
        <thead>
          <tr>
            <th className={styles.tableHeadData}>S/N</th>
            <th className={styles.tableHeadData}>Product</th>
            <th className={styles.tableHeadData}>Quantity</th>
            <th className={styles.tableHeadData}>Price</th>
          </tr>
        </thead>
        <tbody>
          {transaction.prods && transaction.prods.map((transObj, lowerIndex) => (
            <tr key={lowerIndex}>
              <td className={styles.tableBodyData}><span>{lowerIndex + 1}</span></td>
              <td className={styles.tableBodyData} style={{paddingRight: "50px"}}>
                <span style={{fontStyle: "italic", fontSize: "18px"}}>{transObj.name}(#{transObj.price})</span>
              </td>
              <td className={styles.tableBodyData}>
                <span style={{fontStyle: "italic", fontSize: "18px"}}>{transObj.quantity}</span>
              </td>
              <td className={styles.tableBodyData}><span>#{transObj.quantity * transObj.price}</span></td>
            </tr>
          ))}
            <tr>
            <td style={{ textAlign: "center"}}>
            <span style={{color: "red", textAlign: "left", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", textDecoration: "underline"}}>Total</span>
            </td>
              <td style={{ textAlign: "right", paddingRight: "40px"}} colSpan="3">
              <span style={{color: "red", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", textDecoration: "underline"}}>#{calculateIndAmount(higherIndex)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  else if (transaction.type === "deposit"){
    return(
      <>
        <h5>Deposited {transaction.deposit}</h5>
      </>
    )
  }
}

export default TimeLine
