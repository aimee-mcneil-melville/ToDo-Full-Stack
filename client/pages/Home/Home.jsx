import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserLocation, getGardenLocations } from './homeHelper'
import { motion } from 'framer-motion'
import {
  leftVariant,
  rightVariant,
  getStartButtonVariants,
} from '../animationVariants'

export default function Home() {
  const [, setUserCoordinates] = useState(null)
  const [, setGardensCoordinates] = useState([])
  const [, setAddresses] = useState([])
  const [, setNames] = useState([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getGardenLocations().then(({ gardenCoords, addrs, names }) => {
      setGardensCoordinates(gardenCoords)
      setAddresses(addrs)
      setNames(names)
      return null
    })
  }, [])

  useEffect(() => {
    let mounted = true

    function isMounted() {
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
    <section className="flex-container">
      <motion.article
        className="column-6 hero-card"
        variants={leftVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="hero-title">
          Empowering <span>Community Gardens</span> in New Zealand
        </h1>
        <p className="hero-tagline">
          Help your community get the most out of your garden with events and
          reporting and become eligible for government subsidies
        </p>
        <Link to="/gardens">
          <motion.button
            className="button-primary button-width"
            variants={getStartButtonVariants}
            whileHover="hover"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.article>
      <motion.img
        className="hero-image"
        src="/images/comGardenPlant.png"
        alt=""
        variants={rightVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
    </section>
  )
}
