import React, { useState, useEffect } from 'react'
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import NavBar from './miniComponents/navBar'

const LoginPage = () => {
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [ loginLoading, setLoginLoading ] = useState(false)

  const navigate = useNavigate()

  const submitHandler = (event) => {
    setLoginLoading(true)
    event.preventDefault()
    console.log("The form has been submitted")
    fetch("https://record-keeper-api.onrender.com/accounts/login", {
      // https://record-keeper-api.onrender.com/accounts/login
      // "http://127.0.0.1:3000/accounts/login"
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({
        username: username,
        password: password
      })      
    })
    .then(resp=> resp.json())
    .then(data => {
      // data.user ? console.log(data.user) : setError(data.error)
      if (data.error){
        setError(data.error)
        console.log("hey whats going on")
        setLoginLoading(false)
      }
      else{
        localStorage.setItem("token", data.token)
        const tokenData = jwtDecode(data.token)
        setError("")
        switch(tokenData.role){
          case "super": {
            navigate("/dashboard")
            break
          }
          case "admin": {
            navigate("/customers")
            break
          }
          case 'basic': {
            navigate("/customers/" + tokenData.id)
            break
          }
          default: {
            console.log("This place should not be reached")
          }
        }
      }
      console.log(data)
    })
    .catch(error => {
      if (error) {
        console.log("The error is", error)
        setError(error)
        console.log("hey whats going on")
        setLoginLoading(false)
      }
    })
  }

  return(
    <>
    <NavBar />
    <div className={styles.loginContainer}>
      <div className={styles.loginOverlay}>
        <h3 style={{color: "black", textAlign: "center"}}>Login to Your Account</h3>
        <form onSubmit={submitHandler} className={styles.loginFormStyle}>
          <input type="username" value={username} onChange={(e)=>setUsername(e.target.value)} className={styles.inputStyles} placeholder="Enter Username" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.inputStyles} placeholder="Enter Password" />
          {error && <p style={{color: "red"}}>** username or password do not match({error.message})</p>}
          <div style={{textAlign: "center"}}>
            <button style={{color: "white", backgroundColor: "black", fontSize: "15px"}} type="submit" disabled={loginLoading ? true: false}>{loginLoading && <span className={styles.logLoader}></span>}Login</button>
          </div>
          {error && (
            <div>
              <h4>Don't have an account ?</h4>
              <h4>Contact the Owner of the Store</h4>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  )
}


export default LoginPage
