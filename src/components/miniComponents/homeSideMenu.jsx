import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'
import Logo from '/logo.png'

const HomeSideMenu = ({showSideNav, setShowSideNav, decodedData}) => {

    const getDisplay = (decToken) => {
        const val = decToken.role === "admin" || decToken.role === "super" ? "block" : "none"
        return val
    }

    const ulStyles = {
        margin: "0",
        padding: 0,
        listStyle: "none",
        position: "absolute",
        top: "30%",
        width: "100%",
    }
    const liStyles = {
        textAlign: "center", 
        margin: "10px 0", 
        fontSize: "19px",
    }

    const handleHomeNavclose = () => {
        setShowSideNav(false)
    }
    const logoStyle = {
        width: "140px"
    }

    return (
        <>
            <div className={styles.homeSideNav} style={{width: showSideNav ? "100%" : "0"}}>
                <span className={styles.homeNavClose} onClick={handleHomeNavclose}>x</span>
                {!decodedData ? (
                    <div>
                        <h2 style={{textAlign: "center", marginTop: "0"}}><Link style={{color: "goldenrod"}} to="/"><img style={logoStyle} src={Logo} alt="not found" /></Link></h2>
                        <ul style={ulStyles}>
                            <li className={styles.homeNavLi} style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/about">About</Link>
                            </li>
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2 style={{textAlign: "center", marginTop: "0"}}><Link style={{color: "goldenrod"}} to="/"><img style={logoStyle} src={Logo} alt="not found" /></Link></h2>
                        <ul style={ulStyles}>
                            <li className={styles.homeNavLi} style={liStyles}>
                                <Link style={{color: "goldenrod", display: getDisplay(decodedData) }} to="/dashboard">Dashboard</Link>
                            </li>  
                            {decodedData.role === "basic" ? (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to={"/customers/" + decodedData.id}>My Page</Link>
                                </li>
                            ) : (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to="/customers">Customers</Link>
                                </li>
                            )}
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/about">About</Link>
                            </li>
                            {decodedData ? (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to="/logout">Logout</Link>
                                </li>
                            ) : (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomeSideMenu