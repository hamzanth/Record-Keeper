import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './miniComponents/navBar'
import styles from './dashboard.module.css'

const Home = () => {
  const [inp, setInp] = useState("")
  const submitHandler = (e) =>{
    e.preventDefault()
    const inpvalue = inp
    console.log(inpvalue)
    setInp("")
  }
  

  return(
    <>
    <div className={styles.homeBackgroundImg}>
      <div className={styles.homeBackgroundOverlay}>
        <NavBar />
        <h1 style={{color: "white", textAlign: "center"}}>Book Keeping App</h1>
        <h2 style={{color: "white", textAlign: "center"}}>Aboo Qotaddah and sons</h2>
        <Link to="/login">
          <h3 style={{color: "white", textAlign: "center"}}><span className={styles.loginBtnStyle}>Login to Begin Shopping</span></h3>
        </Link>
      </div>
    </div>
    </>
  )
}


export default Home
