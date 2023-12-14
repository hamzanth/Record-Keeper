import React from 'react'
import NavBar from './miniComponents/navBar'
import styles from './dashboard.module.css'

const About = () => {

    return (
        <>  
            <NavBar />
            <div className={styles.aboutContainer}>
                <h1 style={{textAlign: "center"}}>Al Muwafaq Stores</h1>
                <div style={{width: "50%", margin: "auto"}}>
                    <p style={{textAlign: "center", fontSize: "19px"}}>
                        We offer good and quality services with care as the our motto implies. We try as much as we can to
                        to give utmost priority to our customers and ensure that their needs are always met in the sense that
                        whatever they request for is usually made available for them in real time. <br/>
                        Also we try as much as can to make sure that honesty, transparency, quality is part of our recognition
                    </p>
                </div>
            </div>
        </>
    )
}

export default About