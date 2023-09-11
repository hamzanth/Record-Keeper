import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { CustomerContext } from '../context'
import moment from 'moment'
import Products from './ProductPage'
import TimeLine from './miniComponents/timeLine'
import styles from './customer.module.css'

const CustomerDetail = () => {

  const [customerDetail, setCustomerDetail] = useState({})
  const [categoryHead, setCategoryHead] = useState("recent")
  const [showTransactionDetail, setShowTransactionDetail] = useState(false)
  const [transactionDetail, setTransactionDetail] = useState({})
  const [totalDebt, setTotalDebt] = useState(0)
  const [owed, setOwed] = useState(0)
  const [deposit, setDeposit] = useState("")
  const { customers } = useContext(CustomerContext)
  const { saveTransaction } = useContext(CustomerContext)
  const navigate = useNavigate()
  const params = useParams()
  // const saveTransaction = location.state
  // console.log(saveTransaction)
  // console.log(customers)
  useEffect(() => {
    const customerId = params.id
    const detail = customers[customerId]
    console.log("The new customer detail is now")
    console.log(detail)
    setCustomerDetail(detail)
  }, [])

  const handleCategories = (category) => {
    setCategoryHead(category)
  }

  const calculateIndAmount = (index) => {
    let total = 0
    const transaction = customerDetail.timeline[index]
    // console.log(transaction)
    Object.keys(transaction.prod).map(product => {
      total = total + transaction.prod[product].price * transaction.prod[product].quantity
    })
    return total
  }

  const handleClear = (transact) => {
    const detailClone = {...customerDetail}
    const timelineClone = [...detailClone.timeline]
    const transIndex = timelineClone.indexOf(transact)
    const trans = timelineClone[transIndex]
    trans.cleared = !trans.cleared
    timelineClone[transIndex] = trans
    detailClone.timeline = timelineClone
    setCustomerDetail(detailClone)
    // const subAmt = calculateIndAmount(transIndex)
    // const changeTotalAmt = trans.cleared ? totalDebt - subAmt : totalDebt + subAmt
  }

  const handleShowDetail = (transIndex) => {
    setShowTransactionDetail(true)
    const transDet = customerDetail.transactions[transIndex]
    setTransactionDetail(transDet)
  }

  const handleDebtReset = () => {
    const detailClone = {...customerDetail}
    const transactClone = [...detailClone.transactions]
    transactClone.map(trans => {
      trans.cleared = true
    })
    detailClone.transactions = transactClone
    setCustomerDetail(detailClone)
    setTotalDebt(0)
  }

  const handleDeposit = (e) => {
    let depost = null
    try{
      depost = Number(deposit)
    }
    catch(e){
      alert("There is something wrong with your deposit")
    }
    // console.log(depost)
    let newOwing = null
    let newOwed = null
    const newTransaction = {
      type: "deposit",
      deposit: deposit,
      date: new Date()
    }
    if ((customerDetail.amountOwed === 0) && (customerDetail.amountOwing === 0)){
      saveTransaction(customerDetail, newTransaction, 0, Number(depost))
    }
    else{
      if (customerDetail.amountOwing !== 0){
        const netAmount = Number(deposit) - customerDetail.amountOwing
        if (netAmount < 0){
          newOwing = netAmount * -1
          newOwed = 0
          saveTransaction(customerDetail, newTransaction, newOwing, newOwed)
        }
        else{
          newOwing = 0
          newOwed = netAmount
          saveTransaction(customerDetail, newTransaction, newOwing, newOwed)
        }
      }
      else if (customerDetail.amountOwed !== 0){
        newOwing = 0
        newOwed = Number(deposit) + customerDetail.amountOwed
        saveTransaction(customerDetail, newTransaction, newOwing, newOwed)
      }
    }
    setDeposit("")
  }


  return (
    <>
      <div className={styles.showTransDet} style={{display: showTransactionDetail ? "block" : "none"}}>
        <span onClick={() => setShowTransactionDetail(false)} className={styles.cancelTransShow}>x</span>
        <h2>This is the Transaction Detail Dialog</h2>
      </div>
      <div className={styles.container}>
        <h2>This is the customer detail page</h2>
        <p>{customerDetail.name} ({customerDetail.department})</p>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <span style={{color: "red", fontSize: "20px", fontStyle: "italic", fontWeight: "bold"}}>Owing : #{customerDetail.amountOwing}</span>
          <span style={{color: "green", fontSize: "20px", fontStyle: "italic", fontWeight: "bold"}}>Owed: #{customerDetail.amountOwed}</span>
        </div>
        <div className={styles.categoryName}>
          <h5 className={styles.categoryHd} style={{backgroundColor: categoryHead === "history" && "teal", color: categoryHead === "history" && "white"}}>
            <span
              className={styles.categorySpan}
              onClick={() => handleCategories("history")}
              >
                Transaction History
              </span>
          </h5>
          <h5 className={styles.categoryHd} style={{backgroundColor: categoryHead === "recent" && "teal", color: categoryHead === "recent" && "white"}}>
            <span
              className={styles.categorySpan}
              onClick={() => handleCategories("recent")}
              >
                Recent Transactions
              </span>
          </h5>
          <h5 className={styles.categoryHd} style={{backgroundColor: categoryHead === "shop" && "teal", color: categoryHead === "shop" && "white"}}>
            <span
              className={styles.categorySpan}
              onClick={() => handleCategories("shop")}
              >
                Shop
            </span>
          </h5>
        </div>
        <div className={styles.categoryGrid}>
          <div className={styles.historySide} style={{display: categoryHead === "history" ? "block" : "none"}}>
            <h3>Transactions History</h3>
            <div onClick={handleDebtReset} style={{textAlign: "right", marginBottom: "22px"}}><button className={styles.clearAllBtn}>clear All</button></div>
            {customerDetail.timeline && customerDetail.timeline.sort((a, b) => b.date-a.date).map((transaction, higherIndex) => (
              <div key={higherIndex} style={{border: "1px solid teal", borderRadius: "4px", position: "relative", marginBottom: "25px"}}>
                <h4>{moment(transaction.date).fromNow().toString()} </h4>
                <button onClick={() => handleClear(transaction)} className={styles.unclear} style={{display: transaction.type === "sale" ? "inline-block" : "none"}}>{transaction.cleared ? "Unclear" : "Clear"}</button>
                <TimeLine
                  customerDetail = {customerDetail}
                  transaction = {transaction}
                  higherIndex = {higherIndex}
                />

              </div>
            ))}
            <button type="button" onClick={() => navigate(-1)}>go back</button>
          </div>
          <div style={{display: categoryHead === "recent" ? "block" : "none"}}>
            <h3>Uncleared Transactions</h3>
            <div style={{margin: "20px 0"}}>
              <input className={styles.depositInput} type="number" placeholder="Record Deposit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              <button style={{fontSize: "10px"}} onClick={handleDeposit}>Deposit</button>
            </div>
            {customerDetail.timeline && customerDetail.timeline.filter(trans => trans.type === "sale" && trans.cleared === false).sort((a, b) => b.date - a.date).map((transact, index) => (
              <div className={styles.transactRecord} key={index}>
                <p style={{fontSize: "12px", fontStyle:"italic", margin:"12px"}}>{moment(transact.date).fromNow()}</p>
                <p onClick={() => handleShowDetail(index)} className={styles.saleName}>
                  <span className={styles.littleTotal}>{calculateIndAmount(index)}</span>
                  {Object.keys(transact.prod).map((prodKey, ind) => (
                    <span key={ind} style={{fontSize: "12px"}}>{prodKey}: {transact.prod[prodKey].quantity}, </span>
                  ))}
                </p>
                <div className={styles.tickContainer} onClick={() => handleClear(transact)}>{transact.cleared ? <span className={styles.tickSymbol}></span>: <span></span>}</div>
              </div>
            ))}
          </div>
            <div className={styles.productSide} style={{display: categoryHead === "shop" ? "block" : "none"}}>
              <Products customer={customerDetail} setTotalDebt={setTotalDebt} />
            </div>
        </div>
      </div>
    </>
  )
}

export default CustomerDetail
