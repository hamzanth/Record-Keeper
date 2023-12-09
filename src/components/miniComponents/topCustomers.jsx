import React, { useState, useEffect } from 'react'

const TopProducts = () => {
    const [ topCustomers, setTopCustomers ] = useState([])
    useEffect(() => {
        fetch("https://record-keeper-api.onrender.com/accounts/top-customers")
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
                <h3 style={{textAlign: "center"}}>Top 10 Customers</h3>
                {topCustomers && topCustomers.filter(customer => customer.role !== "super").map((cust, index) => (
                    <div key={cust._id}>
                        <p style={{color: index === 0 ? "#4caf50" : "black", fontWeight: index === 0 ? "bold" : "normal", textAlign: "center"}}>{cust.username}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TopProducts