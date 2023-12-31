import React, { useState, useEffect } from 'react'

const TopProducts = () => {
    const [ topProducts, setTopProducts ] = useState([])
    useEffect(() => {
        fetch("https://record-keeper-api.onrender.com/products/top-products")
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
                <h3 style={{textAlign: "center"}}>Top 10 Products</h3>
                {topProducts && topProducts.map((prod, index) => (
                    <div key={prod._id}>
                        <p style={{color: index === 0 ? "#4caf50" : "black", fontWeight: index === 0 ? "bold" : "normal", textAlign: "center"}}>{prod.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TopProducts