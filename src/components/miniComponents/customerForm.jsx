import React, { useState } from 'react'
import styles from '../dashboard.module.css'

const CustomerForm = ({ unCustForm, updateCustomers }) => {
    const [ username, setUsername ]= useState("")
    const [ password, setPassword ]= useState("")
    const [ department, setDepartment ] = useState("")
    const [ error, setError ] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("https://record-keeper-api.onrender.com/accounts/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password, department: department})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            setUsername("")
            setPassword("")
            setDepartment("")
            updateCustomers(data.user)
        })
        .catch(error => {
            setError(error)
        })
    }
    return (
        <>
            <h3 style={{textAlign: "center"}}>Add a Customer</h3>
            <button className={styles.productFormClose} onClick={unCustForm}>X</button>
            <form>
                <input className={styles.productFormInput} type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className={styles.productFormInput} type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className={styles.productFormInput} type="text" placeholder="Enter Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <div style={{textAlign: "center", marginTop: "15px"}}>
                    <button type="submit" onClick={handleSubmit} style={{color: "white", backgroundColor: "goldenrod"}}>Add Customer</button>
                </div>
            </form>
        </>
    )
}

export default CustomerForm