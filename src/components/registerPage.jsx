import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
// import { addDoc, collection } from "firebase/firestore"
// import { firebase, auth } from '../firebase_setup/firebase'
// import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import styles from './auth.module.css'

const RegisterPage = () => {
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [department, setDepartment] = useState("")
  const [lastName, setLastName] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    try{
      const decodedToken = jwtDecode(token)
      if (decodedToken.role !== "admin"){
        navigate("/login")
      }
    }
    catch(error){
      console.log(error)
    }
  }, [])

  // console.log(auth)
  // const addDataToFirebase = async() => {
  //   try{
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  //     console.log("where is the error")
  //     const user = userCredential.user
  //     await addDoc(collection(firebase, "Users"), {
  //       uuid: user.id,
  //       email: user.email,
  //       firstName: firstName,
  //       lastName: lastName
  //     })
      // return true
  //   }
  //   catch(error){
  //     console.log("There is something wrong")
  //     // return {error: error.message}
  //   }
  // }
  const submitHandler = (event) => {
    event.preventDefault()
    console.log("The form has been submitted")
    if (password !== confirmPassword){
      setError("The passwords do not match")
    }
    else{
      fetch("https://record-keeper-api.onrender.com/accounts/register", {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        department: department
      })      
    })
    .then(resp=> resp.json())
    .then(data => {
      console.log(data)
      localStorage.setItem("token", data.token)
      setUsername("")
      setDepartment("")
      setPassword("")
      setConfirmPassword("")
    })
    .catch(error => {
      if (error) console.log(error)
    })
    }
  }

  return(
    <>
    <div className={styles.registerContainer}>
      <h3 style={{color: "black"}}>This is the Register page</h3>
      <form onSubmit={submitHandler}>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className={styles.inputStyles} placeholder="Enter Username" />
        <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)} className={styles.inputStyles} placeholder="Enter Department" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.inputStyles} placeholder="Enter Password" />
        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className={styles.inputStyles} placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  )
}


export default RegisterPage
