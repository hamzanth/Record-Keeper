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

  const [ inp, setInp ] = useState("")
  const [ decodedData, setDecodedData ] = useState(null)
  const [ windowSize, setWindowSize ] = useState(getWindowSize())
  const [ showHamburger, setShowHamburger ] = useState(getShowHam())
  const [ showSideNav, setShowSideNav ] = useState(false)
  const [ blendingIndex, setBlendingIndex ] = useState(0)

  // const changeBlending = () => {
    // setTimeout(() => {
    //   console.log(blendingIndex)
    //   if (blendingIndex === 4){
    //     setBlendingIndex(0)
    //   }
    //   else{
    //     setBlendingIndex(blendingIndex + 1)
    //   }
    //   changeBlending()
    // }, 15000)
  // }

  // changeBlending()

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
          <h2 style={{color: "white", fontSize: "36px", textAlign: "center", marginTop: 0, marginBottom: 0}}><span className={styles.welcome}>Welcome to</span><br/> <span className={styles.almuwaf}>Al Muwaffaq Stores</span><br/><span className={styles.conv}>Your Campus Convenience Hub!</span></h2>
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

          {/* <motion.div
            // initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              // opacity: 1, 
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"] 
            }}
            // transition={{ duration: 0.5 }}
          >
            <h1 style={{textAlign: "center"}}>Ok Practising with Framer Motion</h1>
          </motion.div>

        <hr style={{width: "50%", height: "3px", backgroundColor: "goldenrod", borderRadius: "5px", marginTop: "10px"}} /> */}
        <motion.div 
          style={{textAlign: "center"}}
          initial={{opacity: 0, x: "50px"}}
          whileInView={{
            opacity: 1, 
            x: "0px",
            transition: {duration: 0.9}
          }}
        >
          <h2 style={{textAlign: "center"}}>We offer good and quality products within and beyond the campus premises.</h2>
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
          <motion.div 
            style={{textAlign: "center"}}
            initial={{opacity: 0, y: "70px"}}
            whileInView={{
              opacity: 1, 
              y: "0px",
              transition: {duration: 0.9}
            }}
          >
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Blending Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              Our Blender machine are available 24 hours of the day. We blend things
              like fruits, beans, corn, tomatoes etc.
              Dont hesitate to hit us as soon as you have need to do so.
            </p>
          </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/blender1.png" alt="image not found"/>
            {/* <img style={{width: "100%", height: "50vh", borderRadius: "10px", display: blendingIndex === 1 ? "inline" : "none"}} src="/blender3.jpg" alt="image not found"/>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px", display: blendingIndex === 2 ? "inline" : "none"}} src="/blender4.jpg" alt="image not found"/>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px", display: blendingIndex === 3 ? "inline" : "none"}} src="/blender5.jpg" alt="image not found"/>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px", display: blendingIndex === 4 ? "inline" : "none"}} src="/blender6.jpg" alt="image not found"/>           */}
          </Grid>
        </Grid>
        <Grid style={{display: "flex", alignItems: "center", marginTop: "3px"}} container spacing={8}>
          <Grid item xs={12} md={6}>
          <motion.div 
            style={{textAlign: "center"}}
            initial={{opacity: 0, y: "70px"}}
            whileInView={{
              opacity: 1, 
              y: "0px",
              transition: {duration: 0.9}
            }}
          >
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Bicycle Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              We also offer bicycle services within the campus premises and beyond at affordable prices.
              Our bicycles work at 100% efficency.
            </p>
          </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/bicycle2.jpeg" alt="image not found"/>
          </Grid>
        </Grid>
        <Grid style={{display: "flex", alignItems: "center", marginTop: "3px"}} container spacing={8}>
          <Grid item xs={12} md={6}>
          <motion.div 
            style={{textAlign: "center"}}
            initial={{opacity: 0, y: "70px"}}
            whileInView={{
              opacity: 1, 
              y: "0px",
              transition: {duration: 0.9}
            }}
          >
            <h3 style={{textAlign: "center", fontSize: "25px"}}>Grinding Service</h3>
            <p style={{fontSize: "22px", textAlign: "justify"}}>
              We also offer services for grinding of food items like pepper, melon
              or anything that needs to be grinded.
            </p>
          </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", height: "50vh", borderRadius: "10px"}} src="/grindingmachine2.jpg" alt="image not found"/>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop: "60px"}}>
        <h1 style={{textAlign: "center", marginBottom: "15px"}}>Our Logistics Unit</h1>
        <h3 style={{textAlign: "center", margin: "0px 0px 50px", fontStyle: "italic", wordSpacing: "19px", letterSpacing: "5px"}}>...Connecting Continents, Delivering Confidence...</h3>
        <Grid container spacing={3} style={{backgroundColor: "goldenrod", marginLeft: "0px", borderRadius: "5px", boxSizing: "border-box", marginRight: "44px", padding: "10px 20px 0px 0px"}}>
          <Grid style={{display: "flex", alignItems: "center"}} item xs={12} md={6}>
            <div style={{width: "100%"}}>
              <h2 style={{color: "white", textAlign: "center", fontSize: "31px"}}>Welcome to Al Muwaffaq Logistics</h2>

              <p style={{fontSize: "18px", textAlign: "justify", color: "white"}}>
                AL-MUWAFAFAQ LOGISTICS also provides delivery service by delivering from UNIBEN
                to Second East Circular Road beyond Dawnson (here in Benin City) <br/>
                it's riders are ACTIVE & EQUAL to your various tasks... <br/>
                Contact us for safe and reliable deliveries within campus, around campus, and beyond campus.
                At AL-MUWAFAFAQ LOGISTICS, we redefine the way goods move from point A to point B. With a focus on efficiency,
                reliability, and customer satisfaction, we take pride in delivering logistics solutions that go beyond
                transportation. <br />
                AL-MUWAFAFAQ LOGISTICS is not just a logistics company; we are your strategic partner in navigating the
                complexities of supply chain management. With a commitment to excellence, we leverage cutting-edge technology
                and a delicate team to ensure your cargo reaches its destination seamlessly.
              </p>

            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: "100%", borderRadius: "15px"}} src="/bicycle1.jpeg" alt="image not found"/>
          </Grid>
        </Grid>
      </div>
      <section className="setApart" style={{marginTop: "30px"}}>
        <h1 style={{textAlign: "center"}}>What Sets Us Apart</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <h3 style={{textAlign: "center"}}>Variety and Quality</h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <h3 style={{textAlign: "center"}}>Affordability</h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <h3 style={{textAlign: "center"}}>Student-Centric Approach</h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <h3 style={{textAlign: "center"}}>Accountability</h3>
            </div>
          </Grid>
        </Grid>
      </section>
      <section className="contacts" style={{marginTop: "30px"}}>
        <h1 style={{textAlign: "center", marginBottom: "0"}}>Contacts</h1>
        <h2 style={{textAlign: "center"}}>You can reach us on the following...</h2>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><HomeIcon sx={{fontSize: "80px", color: "goldenrod"}} /></div>
            <h3 style={{textAlign: "center"}}>We are located at University of Benin Central Mosque</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><LocalPhoneIcon sx={{fontSize: "80px", color: "goldenrod"}} /></div>
            <h3 style={{textAlign: "center", marginBottom: 0}}>07043815052</h3>
            <h3 style={{textAlign: "center", marginTop: 0}}>08149976598</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><WhatsAppIcon sx={{fontSize: "80px", color: "goldenrod"}} /></div>
            <h3 style={{textAlign: "center"}}>07043815052</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{textAlign: "center"}}><EmailIcon sx={{fontSize: "80px", color: "goldenrod"}} /></div>
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
