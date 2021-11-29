import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'
import BarGraph from '../../components/dataVis/BarGraph'
import { motion } from 'framer-motion'
import { leftVariant, rightVariant } from '../animationVariants'

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
<<<<<<< HEAD
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
      <motion.div
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
      </motion.div>
=======
    <section className='flex-container flex-garden'>
      <div className='column-6 garden-6'>
        <article className='column-9 garden'>
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={url}>{url}</a>
        </article>
        <Events gardenid={id} events={events} />
      </div>
      <section className='graph-map'>
        <Map
          userCoordinates={location}
          coordinates={[{ lat: lat, lon: lon }]}
          addresses={[address]}
          names={[name]}
        />
        {user.isAdmin ? <BarGraph events={events}/> : null}
      </section>
>>>>>>> a070934dd2303b4bd5a074777c17500563ec0985
    </section>
  )
}
