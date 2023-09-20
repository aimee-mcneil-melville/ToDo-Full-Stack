import { useQuery } from "@tanstack/react-query"
import request from "superagent"
import { EventWithLocation } from "../../models/Event"
import { useParams } from "react-router-dom"
import LineupNav from "./LineupNav"

function useSchedule(day: string) {
  return useQuery({
    queryFn: async () => {
      const res = await request.get(`/api/v1/schedule/${day}`)
      return res.body as { events: EventWithLocation[] }
    },

    queryKey: ['schedule', day]
  })
}

export default function DaySchedule() {
  const { day } = useParams()
  const { data, isError, isLoading, error} = useSchedule(String(day)) 

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data) {
    return <p>Failed {String(error)}</p>
  }

  const { events } = data
  return <>
<LineupNav />
<h2>events: <span className="data">{day}</span></h2>
<a className="nav" href={`/events/add/${day}`}>add event</a>

<ul className="cards">
  {events.map(({ eventName, id, locationName, time, description}) => 
    <li className="card">
    <div className="event">
      <span className="title">{eventName}</span>
      <div className="time-location">
        <p>Location: <span className="data">{locationName}</span></p>
        <p>Time: <span className="data">{time}</span></p>
      </div>
    </div>
    <p className="event-description data">{description}</p>
    <a href={`/events/${id}/edit`}>edit event</a>
  </li>
  )}

</ul>
</>
}
