import React, { useState } from 'react'
import ProductForm from './miniComponents/productForm'
import styles from './product.module.css'

const AdminDashBoard = () => {

  const [ showProductForm, setShowProductForm ] = useState(false)

  const handleShowProductForm = (e) => {
    e.preventDefault() 
    setShowProductForm((showProductForm) => !showProductForm)
  }

  return (
    <>
      <div className={styles.productForm} style={{display: showProductForm ? "block" : "none"}}>
        <ProductForm 
          unDisplayForm={() => setShowProductForm(showProductForm => !showProductForm)}
        />
      </div>
      <h3 style={{color: "black"}}>This is the Admin Dashboard</h3>
      <h2 style={{color: "red"}}>All the records are here</h2>
      <button className={styles.productFormButton} type="button" onClick={handleShowProductForm}>Show Product Form</button>
    </>
  )
}

export default AdminDashBoard
