import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'

const AllCustomers = ({customers, handleMakeBasic, handleMakeAdmin, handleUpdateCustomer, handleDeleteCustomer}) => {
    const [ selectedCustomer, setSelectedCustomer ] = useState({})
    const [ showUpdateCustomer, setShowUpdateCustomer ] = useState(false)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ department, setDepartment ] = useState("")
    const [ image, setImage ] = useState("")

    const handleEditCustomer = (customer) => {
        // console.log(customer)
        setSelectedCustomer(customer)
        setUsername(customer.username)
        setDepartment(customer.department)
        setImage(customer.profilePic)
        setShowUpdateCustomer(true)
    }

    const handleUpdate = (selCust) => {
        const updateObj = {
            username: username,
            password: password,
            department: department,
            image: image 
        }
        setShowUpdateCustomer(false)
        handleUpdateCustomer(selCust, updateObj)
    }

    const handleDelete = (selCust) => {
        setShowUpdateCustomer(false)
        handleDeleteCustomer(selCust)
    }

    return (
        <>  
            <div>
                {showUpdateCustomer && (
                <div className={styles.customerUpdateStyle}>
                    <button className={styles.productFormClose} onClick={() => setShowUpdateCustomer(showUpdateCustomer => !showUpdateCustomer)}>X</button>
                    <h2 style={{textAlign: "center"}}>Update {selectedCustomer.username}</h2>
                    <form style={{marginTop: "40px"}}>
                        <input className={styles.productFormInput} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className={styles.productFormInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className={styles.productFormInput} type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        <input className={styles.productFormInput} type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                        <div className="botButton" style={{textAlign: "center"}}>
                            <button type="button" onClick={() => handleUpdate(selectedCustomer)}>Update</button>
                            <button type="button" onClick={() => handleDelete(selectedCustomer)}>Delete</button>
                        </div>
                    </form>
                </div>
                )}
                <h4 style={{textAlign: "center"}}>All Customers</h4>
                {customers && customers.filter(cust => cust.role !== "super").map(customer => (
                <div key={customer._id} className={styles.indCustStyle}>
                    <Link className={styles.customerLink} to={"/customers/" + customer._id} style={{fontSize: "19px"}}>{customer.username}</Link>
                    <button type="button" onClick={() => handleEditCustomer(customer)} style={{padding: "6px 13px"}}>Edit</button>
                    {customer.role === "admin" ? (
                    <button type="button" onClick={() => handleMakeBasic(customer)} style={{padding: "6px 4px", marginLeft: "15px"}}>remove admin</button>
                    ) : (
                    <button type="button" onClick={() => handleMakeAdmin(customer)} style={{padding: "6px 4px", marginLeft: "15px"}}>make admin</button>
                    )}
                </div>
                ))}
            </div>
        </>
    )
}

export default AllCustomers