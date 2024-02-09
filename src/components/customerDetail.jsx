import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import Products from './productPage'
import TimeLine from './miniComponents/timeLine'
import NavBar from './miniComponents/navBar'
import styles from './customer.module.css'
import HomeSideMenu from './miniComponents/homeSideMenu'

const CustomerDetail = () => {

  const getShowHam = () => {
    const { innerWidth } = window
    return innerWidth < 900 ? true : false
  }

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [customerDetail, setCustomerDetail] = useState({})
  const [categoryHead, setCategoryHead] = useState("recent")
  const [showTransactionDetail, setShowTransactionDetail] = useState(false)
  const [transactionDetail, setTransactionDetail] = useState({})
  const [totalDebt, setTotalDebt] = useState(0)
  const [owed, setOwed] = useState(0)
  const [deposit, setDeposit] = useState("")
  const [decodedToken, setDecodedToken] = useState(null)
  const [error, setError] = useState("")
  const [limitExceeded, setLimitExceeded] = useState(false)
  const [showHamburger, setShowHamburger] = useState(getShowHam())
  const [showSideNav, setShowSideNav] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const navigate = useNavigate()
  const params = useParams()
  // const saveTransaction = location.state
  // console.log(saveTransaction)
  // console.log(customers)
  useEffect(() => {

    const fetchData = async () => {
      const customerId = params.id
      const token = localStorage.getItem("token")
      try{
        const decodedData = await jwtDecode(token)
        console.log(decodedData)
        setDecodedToken(decodedData) 
      }
      catch(error){
        setError(error)
      }
      "http://127.0.0.1:3000/accounts/users/"
      "https://record-keeper-api.onrender.com/accounts/users/"
      fetch("https://record-keeper-api.onrender.com/accounts/users/" + customerId)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data.message)
        console.log(data.user)
        setCustomerDetail(data.user)
      })
      .catch(error => {
        console.log(error)
      })
    }

    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
      setShowHamburger(getWindowSize().innerWidth < 900 ? true : false)
    }

    window.addEventListener("resize", handleWindowResize)
    fetchData()

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }

  }, [])

  const handleCategories = (category) => {
    setCategoryHead(category)
  }

  const saveTransaction = (id, transObj, owing, owed) => {
    fetch("https://record-keeper-api.onrender.com/products/makedeposit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: id, newTransaction: transObj, amountOwing: owing, amountOwed: owed})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.message)
      setCustomerDetail(data.user)
    })
  }

  const calculateIndAmount = (id) => {
    let total = 0
    let transaction = null
    // console.log(customerDetail.timeLine)
    // console.log("this is for the index")
    transaction = customerDetail.timeLine.filter(trans => trans._id === id)[0]

    transaction.prods.map(transObj => {
      total = total + transObj.price * transObj.quantity
    })
    return total
  }

  const handleClear = (transId, userId) => {

    fetch("https://record-keeper-api.onrender.com/products/cleartransaction/" + userId + "/transact/" + transId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({id: transact._id})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.message)
      setCustomerDetail(data.user)
    })
  }

  const handleShowDetail = (transIndex) => {
    setShowTransactionDetail(true)
    const transDet = customerDetail.timeLine[transIndex]
    setTransactionDetail(transDet)
  }

  const handleDebtReset = (userid) => {
    fetch("https://record-keeper-api.onrender.com/products/allreset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userid: userid})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.message)
      setCustomerDetail(data.user)
    })
  }

  const resetOwed = (id) => {
    console.log("This is the id for the reset owed ", id)
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
      saveTransaction(customerDetail._id, newTransaction, 0, Number(depost))
    }
    else{
      if (customerDetail.amountOwing !== 0){
        const netAmount = Number(deposit) - customerDetail.amountOwing
        if (netAmount < 0){
          newOwing = netAmount * -1
          newOwed = 0
          saveTransaction(customerDetail._id, newTransaction, newOwing, newOwed)
        }
        else{
          newOwing = 0
          newOwed = netAmount
          saveTransaction(customerDetail._id, newTransaction, newOwing, newOwed)
          handleDebtReset(customerDetail._id)
        }
      }
      else if (customerDetail.amountOwed !== 0){
        newOwing = 0
        newOwed = Number(deposit) + customerDetail.amountOwed
        saveTransaction(customerDetail._id, newTransaction, newOwing, newOwed)
      }
    }
    setDeposit("")
  }

  if(decodedToken && (!decodedToken.id || !(decodedToken.id === params.id || (decodedToken.role === "super" || decodedToken.role === "admin")))) return <Navigate to="/" replace />
  // if(!decodedToken) return <h1>Loading</h1>

  if (customerDetail && !customerDetail) return <h1 style={{textAlign: "center", marginTop: "30%"}}>Loading...</h1>

  return (
    <>
      <HomeSideMenu 
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
        decodedData={decodedToken}
      />
      <NavBar 
          showHamburger={showHamburger} 
          setShowSideNav={setShowSideNav}
        />
      <div className={styles.showTransDet} style={{display: showTransactionDetail ? "block" : "none"}}>
        <span onClick={() => setShowTransactionDetail(false)} className={styles.cancelTransShow}>x</span>
        <h2>Transaction Detail Dialog</h2>
      </div>
      <div className={styles.container} style={{marginTop: "10%"}}>
        <p style={{textAlign: "center"}}>{customerDetail.username} ({customerDetail.department})</p>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <span style={{color: "red", fontSize: "20px", fontStyle: "italic", fontWeight: "bold"}}>Owing : ₦{customerDetail.amountOwing}</span>
          <span style={{color: "#3f51b5", fontSize: "20px", fontStyle: "italic", fontWeight: "bold"}}>₦{customerDetail.debtLimit}</span>
          <span style={{color: "green", fontSize: "20px", fontStyle: "italic", fontWeight: "bold"}}>
            Owed: ₦{customerDetail.amountOwed} {decodedToken && decodedToken.role === "admin" && <button style={{fontSize: "10px", border: "1px solid teal"}} type="button" onClick={() => resetOwed(customerDetail._id)}>clear</button>}
          </span>
        </div>
        <div className={styles.categoryName}>
          <h5 
            className={styles.categoryHd} 
            style={{backgroundColor: categoryHead === "history" && "goldenrod", color: categoryHead === "history" && "white"}}
            onClick={() => handleCategories("history")}
          >
            <span className={styles.categorySpan}>Transaction History</span>
          </h5>
          <h5 
            className={styles.categoryHd} 
            style={{backgroundColor: categoryHead === "recent" && "goldenrod", color: categoryHead === "recent" && "white"}}
            onClick={() => handleCategories("recent")}
          >
            <span className={styles.categorySpan}>Recent Transactions</span>
          </h5>
          <h5 
            className={styles.categoryHd} 
            style={{backgroundColor: categoryHead === "shop" && "goldenrod", color: categoryHead === "shop" && "white"}}
            onClick={() => handleCategories("shop")}
            >
            <span className={styles.categorySpan}>Shop</span>
          </h5>
        </div>
        <div className={styles.categoryGrid}>
          <div className={styles.historySide} style={{display: categoryHead === "history" ? "block" : "none"}}>
            <h3 style={{textAlign: "center"}}>Transactions History</h3>
            {decodedToken && !decodedToken.role === "basic" && (
              <div onClick={() => handleDebtReset(customerDetail._id)} style={{textAlign: "right", marginBottom: "22px"}}><button className={styles.clearAllBtn}>clear All</button></div>
            )}
            {customerDetail.timeLine && customerDetail.timeLine.sort((a, b) => new Date(b.date) - new Date(a.date)).map((transaction, higherIndex) => (
              <div key={higherIndex} style={{border: "1px solid teal", borderRadius: "4px", position: "relative", marginBottom: "25px"}}>
                <h4>{moment(transaction.date).fromNow().toString()} </h4>
                {!decodedToken.role === "basic" && (
                  <button onClick={() => handleClear(transaction._id, customerDetail._id)} className={styles.unclear} style={{display: transaction.type === "sale" ? "inline-block" : "none"}}>{transaction.cleared ? "Unclear" : "Clear"}</button>
                )}
                <TimeLine
                  customerDetail = {customerDetail}
                  transaction = {transaction}
                  higherIndex = {higherIndex}
                />

              </div>
            ))}
            <div style={{textAlign: "center"}}>
              <button type="button" onClick={() => navigate(-1)}>go back</button>
            </div>
          </div>
          <div style={{display: categoryHead === "recent" ? "block" : "none"}} className={styles.unclearTrans}>
            <h3 style={{textAlign: "center"}}>Uncleared Transactions</h3>
            {decodedToken && decodedToken.role !== "basic" && (
              <div style={{margin: "20px 0", textAlign: "center"}}>
                <input className={styles.depositInput} type="number" placeholder="Record Deposit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                <button style={{fontSize: "10px"}} onClick={handleDeposit}>Deposit</button>
              </div>
            )}
            {customerDetail.timeLine && customerDetail.timeLine.filter(trans => trans.type === "sale" && trans.cleared === false).sort((a, b) => new Date(b.date) - new Date(a.date)).map((transact, index) => (
              <div className={styles.transactRecord} key={index}>
                <p style={{fontSize: "12px", fontStyle:"italic", margin:"12px"}}>{moment(transact.date).fromNow()}</p>
                <p onClick={() => handleShowDetail(index)} className={styles.saleName}>
                  <span className={styles.littleTotal}>{calculateIndAmount(transact._id)}</span>
                  {transact.prods.map((transObj, ind) => (
                    <span key={ind} style={{fontSize: "12px"}}>{transObj.name}: {transObj.quantity}, </span>
                  ))}
                </p>
                <div className={styles.tickContainer} onClick={() => handleClear(transact._id, customerDetail._id)}>{transact.cleared ? <span className={styles.tickSymbol}></span>: <span></span>}</div>
              </div>
            ))}
          </div>
          {categoryHead === "shop" && (
            <div className={styles.productSide}>
              <Products 
                customer={customerDetail} 
                setTotalDebt={setTotalDebt} 
                setCustomerDetail={setCustomerDetail}
                limitExceeded={limitExceeded}
                setLimitExceeded={setLimitExceeded}
              />
            </div>

          )} 
        </div>
      </div>
    </>
  )
}

export default CustomerDetail
