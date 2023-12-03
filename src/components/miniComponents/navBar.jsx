import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import styles from '../dashboard.module.css'
import Logo from '/logo.png'

const NavBar = ({ showHamburger, setShowSideNav }) => {
    const [ decToken, setDecToken ] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        try{
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            setDecToken(decodedToken)
        }
        catch(error){
            console.log("There is no token")
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

    const logoStyle = {
        width: "70px",
    }

    const getDisplay = (decToken) => {
        const val = decToken.role === "admin" || decToken.role === "super" ? "block" : "none"
        return val
    }

    if (showHamburger){
        return (
            <>  
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px"}}>
                    <div className={styles.hamDiv} onClick={() => setShowSideNav(true)}>
                        <span className={styles.hamSpan}></span>
                        <span className={styles.hamSpan}></span>
                        <span className={styles.hamSpan}></span>
                    </div>
                    {/* <h2 style={{textAlign: "center", margin: "10px"}}><Link style={{color: "goldenrod"}} to="/">Logo</Link></h2> */}
                    <Link to="/"><img style={logoStyle} src={Logo} alt="logo not found" /></Link>
                </div>
            </>
        )
    }
    else{
        return(
            <>  
                {!decToken ? (
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", top: "0px", zIndex: "50", width: "100%", backgroundColor: "rgba(0,0,0,0.5)"}}>
                        {/* <h2 style={{textAlign: "center", margin: "5px"}}><Link style={{color: "goldenrod"}} to="/">Logo</Link></h2> */}
                        <Link to="/"><img style={logoStyle} src={Logo} alt="logo not found" /></Link>
                        <ul style={ulStyles}>
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/about">About</Link>
                            </li>
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", top: "0px", zIndex: "50", width: "100%", backgroundColor: "rgba(0,0,0,0.5)"}}>
                        {/* <h2 style={{textAlign: "center", margin: "5px"}}><Link style={{color: "goldenrod"}} to="/">Logo</Link></h2> */}
                        <Link to="/"><img style={logoStyle} src={Logo} alt="logo not found" /></Link>
                        <ul style={ulStyles}>
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod", display: getDisplay(decToken) }} to="/dashboard">Dashboard</Link>
                            </li>  
                            {decToken.role === "basic" ? (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to={"/customers/" + decToken.id}>My Page</Link>
                                </li>
                            ) : (
                                <li style={liStyles}>
                                    <Link style={{color: "goldenrod"}} to="/customers">Customers</Link>
                                </li>
                            )}
                            <li style={liStyles}>
                                <Link style={{color: "goldenrod"}} to="/about">About</Link>
                            </li>
                            {decToken ? (
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
            </>
        )
    }
}

export default NavBar