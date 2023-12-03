import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <>
            <h1 style={{textAlign: "center"}}>Are you sure you want to logout</h1>
            <div style={{textAlign: "center"}}>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Logout