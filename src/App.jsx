import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './components/homePage'
import Products from './components/productPage'
import Customers from './components/customersPage'
import CustomerDetail from './components/CustomerDetail'
import AdminDashBoard from './components/adminDashboard'
import LoginPage from './components/loginPage'
import RegisterPage from './components/registerPage'
import NavBar from './components/miniComponents/navBar'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<AdminDashBoard/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/customers/:id" element={<CustomerDetail/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </>
  )
}

export default App
