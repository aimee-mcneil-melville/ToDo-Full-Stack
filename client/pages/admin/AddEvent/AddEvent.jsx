import React from 'react'
import { useHistory } from 'react-router-dom'
import { addEvent } from './addEventHelper'
import { motion } from 'framer-motion'

import EventForm from '../../../components/events/EventForm/EventForm'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: [0, 1, 0.5, 1],
    transition: { type: 'tween' }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

export default function AddEvent () {
  const history = useHistory()

  function submitEvent (event) {
    addEvent(event, history.push)
  }
  const initialState = {
    title: '',
    date: '',
    volunteersNeeded: 0,
    description: ''
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <EventForm
        formData={initialState}
        action='Create Event'
        submitEvent={submitEvent}
      />
    </motion.div>
  )
}
