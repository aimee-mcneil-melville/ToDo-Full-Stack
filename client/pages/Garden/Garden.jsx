import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'
import BarGraph from '../../components/dataVis/BarGraph'
import { motion } from 'framer-motion'

const leftVariant = {
  hidden: {
    x: '-100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 1,
      duration: 1
    }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeOut', duration: 0.5 }
  }
}

const rightVariant = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 1,
      duration: 1
    }
  },
  exit: {
    x: '100vh',
    transition: { ease: 'easeOut', duration: 0.5 }
  }
}

export default function Garden () {
  const { id } = useParams()
  const garden = useSelector(globalState => globalState.garden)
  const user = useSelector(globalState => globalState.user)
  const location = useSelector(globalState => globalState.location)

  useEffect(() => {
    user.id && getGarden(id, user)
  }, [id, user])

  const { name, description, address, url, events, lat, lon } = garden

  return (
    <section className='flex-container'>
      <motion.div
        variants={leftVariant}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <div className='column-6'>
          <article className='column-9 scroll'>
            <h2>{name}</h2>
            <p>{description}</p>
            <a href={url}>{url}</a>
          </article>
          <Events gardenid={id} events={events} />
        </div>
      </motion.div>
      <motion.section
        variants={rightVariant}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <section>
          <Map
            userCoordinates={location}
            coordinates={[{ lat: lat, lon: lon }]}
            addresses={[address]}
            names={[name]}
          />
          {user.isAdmin ? <BarGraph events={events}/> : null}
        </section>
      </motion.section>
    </section>
  )
}
