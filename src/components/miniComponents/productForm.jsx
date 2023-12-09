import React, { useState } from 'react'
import styles from '../dashboard.module.css'
import axios from 'axios'

const ProductForm = ({unDisplayForm, showProductForm, updateProducts}) => {
    
    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ quantity, setQuantity ] = useState("")
    const [ image, setImage ] = useState("")
    const [ priceDescription, setPriceDescription ] = useState("")
    const [ quantityDescription, setQuantityDescription ] = useState("")
    const [ category, setCategory ] = useState("Snacks")
    const [ quantityRange, setQuantityRange ] = useState("less than")

    const submitHandler = (evt) => {
        evt.preventDefault()
        console.log("The form has been submitted")
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("quantity", quantity)
        formData.append("category", category)
        formData.append("priceDescription", priceDescription)
        formData.append("quantityDescription", quantityDescription)
        formData.append("quantityRange", quantityRange)

        axios.post("https://record-keeper-api.onrender.com/products", formData)
        .then(res => {
          // console.log(res)
          setName("")
          setPrice("")
          setQuantity("")
          setImage("")
          updateProducts(res.data.product)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <div className={styles.productForm} style={{display: showProductForm ? "block" : "none"}}>
          <button type="submit" className={styles.productFormClose} onClick={unDisplayForm}>X</button>
          <h3 style={{textAlign: "center"}}>Add a product to the store</h3>
          <form onSubmit={submitHandler}>
          <label>Enter product name</label>
            <input className={styles.productFormInput} type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Select Category</label>
            <select className={styles.productFormInput} onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="Snack">Snacks</option>
              <option value="Drinks">Drinks</option>
              <option value="Food Stuff">Food Stuff</option>
              <option value="Ingredients">Ingredients</option>
            </select>
            <label>Enter product price</label>
            <input className={styles.productFormInput} type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <label>Enter price description</label>
            <input className={styles.productFormInput} type="text" value={priceDescription} onChange={(e)=>setPriceDescription(e.target.value)} />
            <label>Enter Quantity</label>
            <input className={styles.productFormInput} type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
            <label>Enter Quantity description</label>
            <input className={styles.productFormInput} type="text" value={quantityDescription} onChange={(e)=>setQuantityDescription(e.target.value)} />
            <label>Select Quantity Range</label>
            <select className={styles.productFormInput} onChange={(e) => setQuantityRange(e.target.value)} value={quantityRange}>
              <option value="Less than">Less than</option>
              <option value="Equal to">Equal to</option>
              <option value="Greater than">Greater than</option>
            </select>
            <label>Choose Product Image</label>
            <input className={styles.productFormInput} style={{margin: 0, padding: 0}} type="file" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg" />
            <div style={{textAlign: "center"}}>
            <button className={styles.productAddButton} type="submit">Add</button>
            </div>
          </form>
        </div>
        </>
    )
}

export default ProductForm