import React, { useState } from 'react'
import handleSubmit from "./miniComponents/handleSubmit"

const Home = () => {
  const [inp, setInp] = useState("")
  const submitHandler = (e) =>{
    e.preventDefault()
    const inpvalue = inp
    handleSubmit(inpvalue)
    setInp("")
  }
  return(
    <>
    <div>
      <h1>Book Keeping App</h1>
      <form onSubmit={submitHandler}>
        <p>this is the addition form for adding data to the store </p>
        <input type="text" value={inp} onChange={(e)=>setInp(e.target.value)} placeholder="Enter something" />
        <button type="submit">Enter</button>
      </form>
    </div>
    </>
  )
}


export default Home
