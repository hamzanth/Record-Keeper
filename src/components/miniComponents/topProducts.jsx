import React, { useState, useEffect } from 'react'

const TopProducts = () => {
    const [ topProducts, setTopProducts ] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:3000/products/top-products")
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            setTopProducts(data.products)
        })
        .catch(error => console.log(error))
    }, [])
    return (
        <>
            <div>
                <h3>Top 10 Products</h3>
                {topProducts && topProducts.map((prod, index) => (
                    <div key={prod._id}>
                        <p style={{color: index === 0 ? "#4caf50" : "black", fontWeight: index === 0 ? "bold" : "normal"}}>{prod.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TopProducts