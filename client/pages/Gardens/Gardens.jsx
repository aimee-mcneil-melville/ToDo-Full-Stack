import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllGardens } from './gardensHelper'
import { motion } from 'framer-motion'
import { showError } from '../../actions/error'
import { cardVariant1 } from '../animationVariants'

export default function Gardens() {
  const [gardenList, setGardenList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getAllGardens()
      .then((gardens) => {
        setGardenList(gardens)
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
        return false
      })
  }, [])

  return (
    <ul className="card-container">
      {gardenList.map((garden) => {
        return (
          <motion.li
            className="card"
            key={garden.id}
            variants={cardVariant1}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, yoyo: Infinity },
            }}
          >
            <h2 className="card-header">
              <Link to={`/gardens/${garden.id}`}>{garden.name}</Link>
            </h2>
            <p>Address: {garden.address}</p>
            <p>{garden.description}</p>
          </motion.li>
        )
      })}
    </ul>
  )
}
