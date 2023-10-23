import React, { useState } from 'react'
import styles from '../dashboard.module.css'

const ProductForm = ({unDisplayForm, showProductForm, updateProducts}) => {
    
    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ quantity, setQuantity ] = useState("")
    const [ image, setImage ] = useState("")

    const submitHandler = (evt) => {
        console.log("The form has been submitted")
        evt.preventDefault()
        fetch("http://127.0.0.1:3000/products",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            name: name,
            price: price,
            quantity: quantity,
            image: image
        })})
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setName("")
          setPrice("")
          setQuantity("")
          setImage("")
          updateProducts(data.product)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <div className={styles.productForm} style={{display: showProductForm ? "block" : "none"}}>
          <button type="submit" className={styles.productFormClose} onClick={unDisplayForm}>X</button>
          <h3>Add a product to the store</h3>
          <form onSubmit={submitHandler}>
            <input className={styles.productFormInput} type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name" />
            <input className={styles.productFormInput} type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" />
            <input className={styles.productFormInput} type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="Enter Quantity" />
            <input className={styles.productFormInput} type="text" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="Enter Product Image" />
            <div style={{textAlign: "center"}}>
            <button className={styles.productAddButton} type="submit">Add</button>
            </div>
          </form>
        </div>
        </>
    )
}

export default ProductForm