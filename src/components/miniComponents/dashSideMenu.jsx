import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../dashboard.module.css'
import Logo from '/logo.png'

const DashSideMenu = ({ sideMenuList, selectedNav, setSelectedNav, showSideNav, setShowSideNav, windowSize }) => {

    const handleSelectedNav = (sideItem) => {
        setSelectedNav(sideItem.name)
        if(windowSize.innerWidth < 900){
            setShowSideNav(false)
        }
    }

    const logoStyle = {
        width: "150px"
    }

    return (
        <>
            {/* <p>{menuItem.name}</p> */}
            <ul className={styles.ulStyles} style={{display: showSideNav ? "flex" : "none"}}>
                <span className={styles.closeSideNav} onClick={() => setShowSideNav(false)}>x</span>
                <Link to={"/"}>
                    <h2 className={styles.navBrandName}>AL-MUWAFFAQ STORES</h2>
                    {/* <img style={logoStyle} src={Logo} alt="Logo not found" /> */}
                </Link>
                {sideMenuList.map(sideItem => (
                    <li 
                        className={styles.liStyles} 
                        key={sideItem.id} 
                        style={{backgroundColor: selectedNav === sideItem.name && "rgba(0, 0, 0, 0.8)"}}
                        onClick={() => handleSelectedNav(sideItem)}  
                    >
                    <p>{sideItem.name}</p>

                    </li>
                ))}
            </ul>
        </>
    )
}

export default DashSideMenu