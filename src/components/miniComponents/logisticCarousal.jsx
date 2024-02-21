import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, spring } from 'framer-motion'

const logisticsVariants = {
    hiddenLeft: {
      x: "-100%",
      y: 0,
      opacity: 0
    },
    hiddenRight: {
      x: "100%",
    //   y: 0,
      opacity: 0
    },
    hiddenTop: {
      y: "-100%",
      x: 0,
      opacity: 0
    },
    hiddenBottom: {
      y: "100%",
      x: 0,
      opacity: 0
    },
    scle: {
        scale: 0.5,
        opacity: 0
    },
    vscale: {
        scale: 1,
        opacity: 1,
        transition: {duration: 2}
    },
    visible: {
      x: 0,
    //   y: 0,
      opacity: 1,
      transition: {duration: 2}
    },
    exit: {
      opacity: 0,
    //   scale: 0.8,
      transition: {duration: 0.5}
    }
  }


const LogisticCarousal = ({images, interval=3000}) => {
    const [ imageIndex, setImageIndex ] = useState(0)
    useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            setImageIndex(prevIndex => prevIndex == images.length -1 ? 0 : prevIndex + 1)
        }, interval)
        return () => {
            clearInterval(autoPlayInterval)
        }
    }, [interval])

    return (
        <>
            <AnimatePresence>
                <motion.img 
                  style={{width: "100%", minHeight: "100%", borderRadius: "15px"}} 
                  src={images[imageIndex]} 
                  alt="image not found"
                //   key={imageIndex}
                //   variants={logisticsVariants}
                //   initial="scle"
                //   animate="vscale"
                //   exit="exit"
                  />
              </AnimatePresence>
        </>
    )
}

export default LogisticCarousal