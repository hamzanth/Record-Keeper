import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'
import authStyles from '../auth.module.css'
import moment from 'moment'

const AllCustomers = ({customers, handleMakeBasic, handleMakeAdmin, handleUpdateCustomer, handleDeleteCustomer}) => {
    const [ selectedCustomer, setSelectedCustomer ] = useState({})
    const [ showUpdateCustomer, setShowUpdateCustomer ] = useState(false)
    const [ showSelectedCustomerMod, setShowSelectedCustomerMod ] = useState(false)
    const [ selectedCustomerMod, setSelectedCustomerMod ] = useState({})
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ department, setDepartment ] = useState("")
    const [ image, setImage ] = useState("")
    const [ uloading, setULoading ] = useState(false)
    const [ dloading, setDLoading ] = useState(false)

    const handleEditCustomer = (customer) => {
        // console.log(customer)
        setSelectedCustomer(customer)
        setUsername(customer.username)
        setDepartment(customer.department)
        setImage(customer.profilePic)
        setShowUpdateCustomer(true)
    }

    const handleUpdate = (selCust) => {
        setULoading(true)
        const updateObj = {
            username: username,
            password: password,
            department: department,
            image: image 
        }
        handleUpdateCustomer(selCust, updateObj)
        setShowUpdateCustomer(false)
        setULoading(false)
    }

    const handleDelete = (selCust) => {
        setDLoading(true)
        setShowUpdateCustomer(false)
        handleDeleteCustomer(selCust)
        setDLoading(false)
    }
    const handleCustomerClicked = (customer) => {
        console.log(customer)
        setSelectedCustomerMod(customer)
        setShowSelectedCustomerMod(true)
    }
    // <Link className={styles.customerLink} to={"/customers/" + customer._id} style={{fontSize: "19px"}}>{customer.username}</Link>

    return (
        <>  
            <div>
                {showSelectedCustomerMod && (
                    <div className={styles.customerUpdateStyle} style={{oveflow: "auto"}}>
                        <button className={styles.productFormClose} onClick={() => setShowSelectedCustomerMod(selectedCustomerMod => !selectedCustomerMod)}>X</button>            
                        {selectedCustomerMod.timeLine && selectedCustomerMod.timeLine.length === 0 ? (
                            <div> 
                                <p style={{textAlign: "center"}}>There are no record yet</p>
                            </div>
                        ) : (
                            <div>
                                {selectedCustomerMod.timeLine && selectedCustomerMod.timeLine.sort((a, b) => new Date(b.date) - new Date(a.date)).map(indHist => (
                                        <div style={{border: "3px solid teal", borderRadius: "4px", padding: "6px", margin: "10px 0"}} key={indHist._id}>
                                            <p style={{ color: "black", margin: "0"}}>{indHist.name} - {moment(indHist.date).calendar()} ({moment(indHist.date).fromNow()})</p>
                                            {indHist.prods && indHist.prods.map(trans => (
                                                <p key={trans._id} style={{ color: "black", margin: "0"}}>{trans.name} {trans.quantity}</p>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}
                {showUpdateCustomer && (
                <div className={styles.customerUpdateStyle}>
                    <button className={styles.productFormClose} onClick={() => setShowUpdateCustomer(showUpdateCustomer => !showUpdateCustomer)}>X</button>
                    <h2 style={{textAlign: "center"}}>Update {selectedCustomer.username}</h2>
                    <form style={{marginTop: "40px"}}>
                        <label>Change username</label>
                        <input className={styles.productFormInput} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Change password or Leave blank to use original password</label>
                        <input className={styles.productFormInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Change department</label>
                        <input className={styles.productFormInput} type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        {/* <label>Change Image or leave blank</label>
                        <input className={styles.productFormInput} type="text" value={image} onChange={(e) => setImage(e.target.value)} /> */}
                        <div className="botButton" style={{textAlign: "center"}}>
                            <button type="button" onClick={() => handleUpdate(selectedCustomer)}>{uloading && <span className={authStyles.logLoader}></span>}Update</button>
                            <button type="button" onClick={() => handleDelete(selectedCustomer)}>{dloading && <span className={authStyles.logLoader}></span>} Delete</button>
                        </div>
                    </form>
                </div>
                )}
                <h4 style={{textAlign: "center"}}>All Customers</h4>
                {customers ? (
                    customers.filter(cust => cust.role !== "super").map(customer => (
                        <div key={customer._id} className={styles.indCustStyle}>
                            <p className={styles.customerLinkOpen} style={{fontSize: "19px"}} onClick={() => handleCustomerClicked(customer)}>{customer.username}</p>
                            <button type="button" onClick={() => handleEditCustomer(customer)} style={{padding: "6px 13px"}}>Edit</button>
                            {customer.role === "admin" ? (
                            <button type="button" onClick={() => handleMakeBasic(customer)} style={{padding: "6px 4px", marginLeft: "15px"}}>remove admin</button>
                            ) : (
                            <button type="button" onClick={() => handleMakeAdmin(customer)} style={{padding: "6px 4px", marginLeft: "15px"}}>make admin</button>
                            )}
                        </div>
                        ))
                ) : (
                    <div>
                        <h2>Loading</h2>
                    </div>
                ) }
            </div>
        </>
    )
}

export default AllCustomers