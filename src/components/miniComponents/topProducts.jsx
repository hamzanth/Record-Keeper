import React, { useState, useEffect } from 'react'

const TopProducts = () => {
    const [ topProducts, setTopProducts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        // http://127.0.0.1:3000/products/top-products
        // https://record-keeper-api.onrender.com/products/top-products
        fetch("https://record-keeper-api.onrender.com/products/top-products")
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            setTopProducts(data.products)
            console.log(data.products)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [])

    if(loading) return <h2 style={{textAlign: "center"}}>Loading...</h2>
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