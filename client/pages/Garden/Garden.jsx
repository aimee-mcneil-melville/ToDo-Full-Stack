import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'
import EventDetailCard from '../../components/events/EventDetailCard/EventDetailCard'
import BarGraph from '../../components/dataVis/BarGraph'

export default function Garden () {
  const { id } = useParams()
  const garden = useSelector(globalState => globalState.garden)
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  // const [isLoading, setLoad] = useState(true)
  useEffect(() => {
    getGarden(id)
  }, [id])
  const { name, description, address, url, events, lat, lon } = garden
  return (
    <section className='flex-container'>
      <div className='column-6'>
        <article className='column-9 scroll'>
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={url}>{url}</a>
        </article>
        {isAdmin ? <BarGraph events={events}/> : null}
        <Events events={events} />
      </div>
      {isAdmin
        ? <EventDetailCard />
        : <Map
          coordinates={[{ lat: lat, lon: lon }]}
          addresses={[address]}
          names={[name]}
        />
      }
    </section>
  )
}
