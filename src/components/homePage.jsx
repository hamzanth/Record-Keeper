import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './miniComponents/navBar'
import styles from './dashboard.module.css'
import jwtDecode from 'jwt-decode'
import HomeSideMenu from './miniComponents/homeSideMenu'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import HomeIcon from '@mui/icons-material/Home'
import { Grid } from '@mui/material'
import { motion, AnimatePresence, spring } from 'framer-motion'

const Home = () => {

  const getWindowSize = () => {
    const { innerWidth, innerHeight} = window
    return { innerWidth, innerHeight }
  }
  const getShowHam = () => {
    const { innerWidth } = window
    return innerWidth < 900 ? true : false
  }
  const imgStyle = {
    width: "100%",
    height: "40vh",
    borderRadius: "15px"
  }
  const captionStyle = {
    position: "absolute",
    bottom: "-15px",
    left: "0px",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    textAlign: "center",
    width: "100%",
  }

  const [inp, setInp] = useState("")
  const [ decodedData, setDecodedData ] = useState(null)
  const [ windowSize, setWindowSize ] = useState(getWindowSize())
  const [ showHamburger, setShowHamburger ] = useState(getShowHam())
  const [ showSideNav, setShowSideNav ] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    try {
      const decData = jwtDecode(token)
      setDecodedData(decData)
    } catch (error) {
      console.log(error)
    }
    const handleWindleResize = () => {
      setWindowSize(getWindowSize())
      setShowHamburger(getWindowSize().innerWidth < 900 ? true : false)
    }
    window.addEventListener("resize", handleWindleResize)
    return () => {
      window.removeEventListener("resize", handleWindleResize)
    }
  }, [])

  const submitHandler = (e) =>{
    e.preventDefault()
    const inpvalue = inp
    console.log(inpvalue)
    setInp("")
  }
  
  const loginBtnStyle = {
    position: "absolute",
    top: "60%",
    width: "100%"
  }

  return(
    <>
    <HomeSideMenu 
      showSideNav={showSideNav}
      setShowSideNav={setShowSideNav}
      decodedData={decodedData}
    />
    <div className={styles.homeBackgroundImg}>
      <div className={styles.homeBackgroundOverlay}>
        <NavBar 
          showHamburger={showHamburger} 
          setShowSideNav={setShowSideNav}
        />
        {/* <div style={{marginBottom: "130px"}}></div> */}
        <div className={styles.motto}>
          <h1 style={{color: "white", textAlign: "center", marginTop: 0, marginBottom: 0}}>Al Muwaffaq Stores</h1>
          <h5 style={{color: "goldenrod", textAlign: "center", fontStyle: "italic", marginTop:0}}>(Providing Essentials with care)</h5>
        </div>
        {!decodedData && (
          <Link className={styles.loginLinkStyle} to="/login">
            <h3 style={{color: "white", textAlign: "center"}}><span className={styles.loginBtnStyle}>Login to Begin Shopping</span></h3>
          </Link>
        )}
      </div>
    </div>
    <div className={styles.mainBody} style={{width: "80%", margin: "0 auto"}}>
      <div className="subhero">
        <motion.h1 
          style={{textAlign: "center", marginBottom: "0px"}}
          whileHover={{scale: 1.2}}
          whileTap={{scale: 0.8}}
          drag="x"
          dragConstraints={{left: -100, right: 100}}
        >
          Explore Our Market
        </motion.h1>
        <hr style={{width: "15%", height: "3px", backgroundColor: "goldenrod", borderRadius: "5px", marginTop: "0"}} />
        <motion.div 
          style={{textAlign: "center"}}
          initial={{opacity: 0, x: "50px"}}
          whileInView={{
            opacity: 1, 
            x: "0px",
            transition: {duration: 0.9}
          }}
        >
          <h2 style={{textAlign: "center"}}>We offer good and quality products within and beyond the campus premises</h2>
        </motion.div>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{position: "relative"}}>
                <img style={imgStyle} src="/deepfreezer1.jpeg" alt="image not found"/>
                <h3 style={captionStyle}>Deep Freezer</h3>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{position: "relative"}}>
                <img style={imgStyle} src="/drinks1.jpeg" alt="image not found"/>
                <h3 style={captionStyle}>Drinks</h3>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{position: "relative"}}>
                <img style={imgStyle} src="/foodstuff1.jpeg" alt="image not found"/>
                <h3 style={captionStyle}>Food Stuff</h3>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{position: "relative"}}>
                <img style={imgStyle} src="/snacks1.jpeg" alt="image not found"/>
                <h3 style={captionStyle}>Snacks</h3>
              </div>
            </Grid>
        </Grid>
      </div>
      <div> 
        <h1 style={{textAlign: "center", marginBottom: "0px"}}>Services We Render</h1>
        <hr style={{width: "15%", height: "3px", backgroundColor: "goldenrod", borderRadius: "5px", marginTop: "0"}} />
        <Grid style={{display: "flex", alignItems: "center"}} container spacing={8}>
          <Grid item xs={12} md={6}>
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Blending Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              Our Blender machine are available 24 hours of the day.
              Dont hesitate to hit us as soon as you have need to do so
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/blender1.png" alt="image not found"/>
          </Grid>
        </Grid>
        <Grid style={{display: "flex", alignItems: "center", marginTop: "3px"}} container spacing={8}>
          <Grid item xs={12} md={6}>
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Bicycle Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              We also offer bicycle services within the campus premises and beyond.
              Our bicycles work at 100% efficency
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/bicycle2.jpeg" alt="image not found"/>
          </Grid>
        </Grid>
        <Grid style={{display: "flex", alignItems: "center", marginTop: "3px"}} container spacing={8}>
          <Grid item xs={12} md={6}>
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Grinding Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              We also offer services for grinding of food items like pepper, melon
              or anything that needs to be grinded.
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/grindingmachine2.jpg" alt="image not found"/>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop: "60px"}}>
        <h1 style={{textAlign: "center", marginBottom: "15px"}}>Our Logistics Unit</h1>
        <h3 style={{textAlign: "center", margin: "0px 0px 50px", fontStyle: "italic", wordSpacing: "19px", letterSpacing: "5px"}}>...Connecting Continents, Delivering Confidence...</h3>
        <Grid container spacing={4} style={{backgroundColor: "goldenrod", marginLeft: "0px", marginRight: "29px", borderRadius: "5px", border: "1px solid red", paddingBottom: "25px", paddingRight: "30px"}}>
          <Grid style={{display: "flex", alignItems: "center"}} item xs={12} md={6}>
            <p style={{fontSize: "18px", textAlign: "justify", color: "white"}}>
              AL-MUWAFAFAQ LOGISTICS has finally kicked off it's delivery service by delivering from UNIBEN
              to Second East Circular Road beyond Dawnson (here in Benin City) <br/>
              it's riders are ACTIVE & EQUAL to your various tasks... <br/>
              Contact us for safe and reliable deliveries within campus, around campus, and beyond campus
            </p>
          </Grid>
          <Grid item xs={12} md={6} style={{border: "1px solid green"}}>
            <img style={{width: "100%", borderRadius: "15px"}} src="/bicycle1.jpeg" alt="image not found"/>
          </Grid>
        </Grid>
      </div>
      <section className="contacts" style={{marginTop: "30px"}}>
        <h1 style={{textAlign: "center", marginBottom: "0"}}>Contacts</h1>
        <h2 style={{textAlign: "center"}}>You can reach us on the follow...</h2>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><HomeIcon sx={{fontSize: "80px", color: "goldenrod"}} /></div>
            <h3 style={{textAlign: "center"}}>We are located at University of Benin Central Mosque</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><LocalPhoneIcon sx={{fontSize: "80px", color: "goldenrod"}}neIcon /></div>
            <h3 style={{textAlign: "center"}}>09030606826</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><WhatsAppIcon sx={{fontSize: "80px", color: "goldenrod"}}Icon /></div>
            <h3 style={{textAlign: "center"}}>09032071775</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><EmailIcon sx={{fontSize: "80px", color: "goldenrod"}}n /></div>
            <h3 style={{textAlign: "center", wordWrap:"break-word"}}>almuwaffaqstores1445@gmail.com</h3>
          </Grid>
        </Grid>
      </section>
    </div>
    <section className='footer' style={{backgroundColor: "black", padding: "20px", marginTop: "50px"}}>
          <p style={{textAlign: "center", color: "white", margin: "0"}}>&copy;copyright Al Muwaffaq Stores 2023</p>
    </section>
    </>
  )
}


export default Home
