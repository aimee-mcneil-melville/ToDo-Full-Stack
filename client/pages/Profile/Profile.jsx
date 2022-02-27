import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../../components/Registration/Register'
import { View } from '../../components/Registration/View'
import { motion } from 'framer-motion'
import { profileVariants } from '../animationVariants'

export default function Profile() {
  const user = useSelector((globalState) => globalState.user)
  const garden = useSelector((globalState) => globalState.garden)

  return (
    <motion.div
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {user.gardenId ? (
        <View user={user} garden={garden} />
      ) : (
        <Register user={user} />
      )}
    </motion.div>
  )
}
