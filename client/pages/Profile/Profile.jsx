import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../../components/Registration/Register'
import { View } from '../../components/Registration/View'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', mass: 0.5 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

export default function Profile () {
  const user = useSelector(globalState => globalState.user)
  const garden = useSelector(globalState => globalState.garden)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {
        user.gardenId
          ? (<View user={user} garden={garden}/>)
          : (<Register user={user}/>)
      }
    </motion.div>
  )
}
