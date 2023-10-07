import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div>
      <h1>Book Keeping App</h1>
      <h2>Aboo Qotaddah and sons</h2>
      <Link to="/login">
        <h3>Login to Begin Shopping</h3>
      </Link>
    </div>
    </>
  )
}


export default Home
