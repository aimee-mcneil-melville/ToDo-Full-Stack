import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllGardens } from './gardensHelper'
import { motion } from 'framer-motion'
import { containerVariants, gardensListVariants } from '../animationVariants'
import { showError } from '../../actions/error'
import { dispatch } from '../../store'

export default function Gardens () {
  const [gardenList, setGardenList] = useState([])

  useEffect(() => {
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => {
        dispatch(showError(err.message))
        return false
      })
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit">

      <ul>
        {gardenList.map((garden) => {
          return <motion.li key={garden.id}
            variants={gardensListVariants}
            whileHover='hover'
          >
            <Link to={`/gardens/${garden.id}`}>
              <h2>{garden.name}</h2>
            </Link>
            <h4>Address: {garden.address}</h4>
            <p>{garden.description}</p>
          </motion.li>
        })}
      </ul>

    </motion.div>
  )
}
