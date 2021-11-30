import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { getAllGardens } from './gardensHelper'

export default function Gardens() {
  const [gardenList, setGardenList] = useState([])

  const cardVariant1 = {
    hidden: {
      y: '-100vw'
    },
    visible: {
      y: 0,
      transition: {
        ease: 'easeInOut',
        duration: 2
      }
    },
    transition: {
      duration: 2
    }
  }

  useEffect(() => {
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <ul className='garden-list-container'>
      {gardenList.map((garden) => {
        return (
          <motion.li
            className='home-title-container garden-list-info'
            key={garden.id}
            variants={cardVariant1}
            initial='hidden'
            animate='visible'
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}>
            <Link to={`/gardens/${garden.id}`}>
              <h2 className='garden-list-header'>{garden.name}</h2>
            </Link>
            <h4>Address: {garden.address}</h4>
            <p className='garden-description'>{garden.description}</p>
          </motion.li>
        )
      })}
    </ul>
  )
}
