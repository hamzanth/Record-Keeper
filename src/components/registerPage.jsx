import React, { useState } from 'react'
import { addDoc, collection } from "firebase/firestore"
import { firebase, auth } from '../firebase_setup/firebase'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import styles from './auth.module.css'

const RegisterPage = () => {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  // console.log(auth)
  const addDataToFirebase = async() => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("where is the error")
      const user = userCredential.user
      await addDoc(collection(firebase, "Users"), {
        uuid: user.id,
        email: user.email,
        firstName: firstName,
        lastName: lastName
      })
      // return true
    }
    catch(error){
      console.log("There is something wrong")
      // return {error: error.message}
    }
  }
  const submitHandler = (event) => {
    event.preventDefault()
    console.log("The form has been submitted")
    if (password !== confirmPassword){
      setError("The passwords do not match")
    }
    else{
      addDataToFirebase()
    }
  }

  return(
    <>
    <div className={styles.registerContainer}>
      <h3 style={{color: "black"}}>This is the Register page</h3>
      <form onSubmit={submitHandler}>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={styles.inputStyles} placeholder="Enter Email" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.inputStyles} placeholder="Enter Password" />
        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className={styles.inputStyles} placeholder="Confirm Password" />
        <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className={styles.inputStyles} placeholder="Enter First Name" />
        <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className={styles.inputStyles} placeholder="Enter Last Name" />
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  )
}


export default RegisterPage
