import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllGardens } from './gardernListHelper'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', delay: 0.2, duration: 0.6 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

const listVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring'
    }
  }
}

export default function GardenList () {
  const [gardenList, setGardenList] = useState([])

  useEffect(() => {
    // get api
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => console.error(err))
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
            variants={listVariants}
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
