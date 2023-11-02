import React, {useState, useEffect} from 'react'
import styles from '../dashboard.module.css'
import axios from 'axios'

const EditProduct = ({selectedProduct, setShowProductDetail, editProductList, deleteProductList}) => {
    const [ name, setName ] = useState(selectedProduct.name)
    const [ price, setPrice ] = useState(selectedProduct.price)
    const [ quantity, setQuantity ] = useState(selectedProduct.quantity)
    const [ image, setImage ] = useState(selectedProduct.image)
    const [ category, setCategory ] = useState(selectedProduct.category)
    const [ error, setError ] = useState(null)

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("quantity", quantity)
        formData.append("image", image)
        axios.put(`http://127.0.0.1:3000/products/${selectedProduct._id}/update`, formData)
        .then(res => {
            console.log(res.data.message)
            editProductList(selectedProduct, res.data.product)
        })
        .catch(error => console.log(error))
        // fetch(`http://127.0.0.1:3000/products/${selectedProduct._id}/update`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({name: name, price: price, quantity: quantity, image: image})
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data.message)
        //     editProductList(selectedProduct, data.product)
        // })
        // .catch(error => {
        //     setError(error)
        // })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/products/${selectedProduct._id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            console.log(data.product)
            deleteProductList(data.product)
        })
        .catch(error => {
            setError(error)
        })
    }

    return (
        <>
        <div className={styles.prodDetailModal}>
            <button className={styles.prodDetX} onClick={() => setShowProductDetail(showProductDetail => !showProductDetail)}>x</button>
            <h3 style={{textAlign: "center"}}>Update Product</h3>
            <form>
                <input className={styles.productFormInput} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <select className={styles.productFormInput} onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="Snack">Snacks</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Food Stuff">Food Stuff</option>
                    <option value="Ingredients">Ingredients</option>
                </select>
                <input className={styles.productFormInput} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <input className={styles.productFormInput} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <label>Choose Product Image</label>
                <input className={styles.productFormInput} style={{margin: 0, padding: 0}} type="file" onChange={(e) => setImage(e.target.files[0])}/>
                {error && (
                    <h3 style={{color: "red"}}></h3>
                )}
                <div style={{textAlign: "center"}}>
                    <button className={styles.updateProductBtn} style={{border: "2px solid greenyellow", marginRight: "30px"}} type="submit" onClick={handleUpdate}>Update</button>
                    <button className={styles.deleteProductBtn} style={{border: "2px solid #f44336"}} type="submit" onClick={handleDelete}>Remove</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditProduct