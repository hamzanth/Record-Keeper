import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const NavBar = () => {
    const [ decToken, setDecToken ] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        try{
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            setDecToken(decodedToken)
        }
        catch(error){
            console.log(error)
        }
    }, [])

    const ulStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        listStyle: "none",
        margin: 0,
        padding: 0,
    }
    const liStyles = {
        padding: "5px 19px",
    }
    const getDisplay = (decToken) => {
        const val = decToken.role === "admin" || decToken.role === "super" ? "block" : "none"
        return val
    }
    return(
        <>  
            {decToken && (
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <h2 style={{textAlign: "center"}}><Link style={{color: "gold"}} to="/">Logo</Link></h2>
                    <ul style={ulStyles}>
                        <li style={liStyles}>
                            <Link style={{color: "gold", display: getDisplay(decToken) }} to="/dashboard">Dashboard</Link>
                        </li>
                        <li style={liStyles}>
                            <Link style={{color: "gold"}} to="/customers">Customers</Link>
                        </li>
                        <li style={liStyles}>
                            <Link style={{color: "gold"}} to="/">About</Link>
                        </li>
                        {decToken ? (
                            <li style={liStyles}>
                                <Link style={{color: "gold"}} to="/logout">Logout</Link>
                            </li>
                        ) : (
                            <li style={liStyles}>
                                <Link style={{color: "gold"}} to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

export default NavBar