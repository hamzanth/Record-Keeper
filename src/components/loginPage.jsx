import React, { useState, useEffect } from 'react'
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const LoginPage = () => {
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()
    console.log("The form has been submitted")
    fetch("http://127.0.0.1:3000/accounts/login", {
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
      }
      else{
        localStorage.setItem("token", data.token)
        const tokenData = jwtDecode(data.token)
        setError("")
        tokenData.role === "admin" ? navigate("/customers") : navigate("/customers/" + tokenData.id)
        // navigate("")
      }
      console.log(data)
    })
    .catch(error => {
      if (error) {
        console.log("The error is", error)
        setError(error)
      }
    })
  }

  return(
    <>
    <div className={styles.registerContainer}>
      <h3 style={{color: "black"}}>This is the Login page</h3>
      <form onSubmit={submitHandler}>
        <input type="username" value={username} onChange={(e)=>setUsername(e.target.value)} className={styles.inputStyles} placeholder="Enter Username" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.inputStyles} placeholder="Enter Password" />
        {error && <p style={{color: "red"}}>** username or password do not match({error.message})</p>}
        <button style={{color: "white", backgroundColor: "black", fontSize: "15px"}} type="submit">Login</button>
        {error && (
          <div>
            <h2>Don't have an account ?</h2>
            <h2>Contact the Owner of the Store to add you to the records</h2>
          </div>
        )}
      </form>
    </div>
    </>
  )
}


export default LoginPage
