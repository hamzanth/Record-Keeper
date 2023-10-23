import React, {useState, useEffect} from 'react'
import styles from '../dashboard.module.css'

const EditProduct = ({selectedProduct, setShowProductDetail, editProductList, deleteProductList}) => {
    const [ name, setName ] = useState(selectedProduct.name)
    const [ price, setPrice ] = useState(selectedProduct.price)
    const [ quantity, setQuantity ] = useState(selectedProduct.quantity)
    const [ image, setImage ] = useState(selectedProduct.image)
    const [ error, setError ] = useState(null)

    const handleUpdate = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/products/${selectedProduct._id}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name, price: price, quantity: quantity, image: image})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            editProductList(selectedProduct, data.product)
        })
        .catch(error => {
            setError(error)
        })
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
                <input className={styles.productFormInput} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <input className={styles.productFormInput} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <input className={styles.productFormInput} type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
                {error && (
                    <h3 style={{color: "red"}}></h3>
                )}
                <div style={{textAlign: "center"}}>
                    <button style={{border: "2px solid greenyellow", marginRight: "30px"}} type="submit" onClick={handleUpdate}>Update</button>
                    <button style={{border: "2px solid #f44336"}} type="submit" onClick={handleDelete}>Remove</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditProduct