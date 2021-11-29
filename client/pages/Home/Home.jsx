import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserLocation, getGardenLocations } from './homeHelper'
import { motion } from 'framer-motion'

const leftVariant = {
  hidden: {
    x: '-100vw'
  },
  visible: {
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

const rightVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

export default function Home () {
  const [, setUserCoordinates] = useState(null)
  const [, setGardensCoordinates] = useState([])
  const [, setAddresses] = useState([])
  const [, setNames] = useState([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getGardenLocations()
      .then(({ gardenCoords, addrs, names }) => {
        setGardensCoordinates(gardenCoords)
        setAddresses(addrs)
        setNames(names)
        return null
      })
  }, [])

  useEffect(() => {
    let mounted = true

    function isMounted () {
      return mounted
    }

    getUserLocation((location) => {
      setUserCoordinates(location)
    }, isMounted)

    // you can return a "clean up" function from useEffect - this runs when
    // the component unmounts
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className='flex-container'>
      <motion.article className='column-6 home-title-container'
        variants={leftVariant}
        initial='hidden'
        animate='visible'
      >
        <h1 className="home-title-1">Empowering</h1>
        <h1 className="home-title-2">Community Gardens</h1>
        <h1 className="home-title-3">in New Zealand</h1>
        <p className='hero-title'>Help your community get the most out of your garden with events and reporting and become eligible for government subsidies</p>
        <Link className='button-primary button-width' to='/gardens'>Get Started</Link>
      </motion.article>

      <motion.img
        className='home-image'
        src='/images/comGardenPlant.png'
        alt=""
        variants={rightVariant}
        initial='hidden'
        animate='visible'
      />

    </section>
  )
}
