import React, { useState, useEffect } from 'react'

const TopProducts = () => {
    const [ topCustomers, setTopCustomers ] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:3000/accounts/top-customers")
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            setTopCustomers(data.customers)
        })
        .catch(error => console.log(error))
    }, [])
    return (
        <>
            <div>
                <h3>Top 10 Customers</h3>
                {topCustomers && topCustomers.filter(customer => customer.role !== "super").map((cust, index) => (
                    <div key={cust._id}>
                        <p style={{color: index === 0 ? "#4caf50" : "black"}}>{cust.username}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TopProducts