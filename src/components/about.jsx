import React from 'react'
import NavBar from './miniComponents/navBar'
import styles from './dashboard.module.css'

const About = () => {

    return (
        <>  
            <NavBar />
            <div className={styles.aboutContainer}>
                <h1 style={{textAlign: "center"}}>Al Muwafaq Stores</h1>
                <p style={{textAlign: "center"}}>We provide the best services world wide</p>
            </div>
        </>
    )
}

export default About