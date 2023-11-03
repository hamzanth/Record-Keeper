import React, { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'

const DashSideMenu = ({ sideMenuList, selectedNav, setSelectedNav, showSideNav, setShowSideNav }) => {

    const handleSelectedNav = (sideItem) => {
        setSelectedNav(sideItem.name)
        setShowSideNav(false)
    }

    return (
        <>
            {/* <p>{menuItem.name}</p> */}
            <ul className={styles.ulStyles} style={{display: showSideNav ? "flex" : "none"}}>
                <span className={styles.closeSideNav} onClick={() => setShowSideNav(false)}>x</span>
                {sideMenuList.map(sideItem => (
                    <li 
                        className={styles.liStyles} 
                        key={sideItem.id} 
                        style={{backgroundColor: selectedNav === sideItem.name && "rgb(42, 42, 94)"}}
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