import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function EventForm() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [volunteers, setVolunteers] = useState(0)
    const [description, setDescription] = useState('')

    // function handleNameChange(e){
    //     setTitle(e.target.value)
    // }

    function handleSubmit(e){
        e.preventDefault()
        console.log(title, date, volunteers, description)
    }

    return (
        <>
        <div className="create-event-form">
            <h1>Kelmarna Gardens</h1>
            <h3>Create new event</h3>
            <form onSubmit={handleSubmit}>
                <h5>Event Title</h5>

                <input className="input is-normal" type="text" 
                placeholder="event title"
                name="title"
                value={title} onChange={event => setTitle(event.target.value)}/> 

                <h5>Date</h5>
                <input className="input is-normal" type="datetime-local" 
                placeholder="date and time"
                name="date"
                value={date} onChange={event => setDate(event.target.value)}/>

                <h5>Volunteers Needed</h5>
                <input className="input is-normal" type="number" 
                placeholder="number of volunteers needed"
                name="volunteers"
                value={volunteers} onChange={event => setVolunteers(event.target.value)}/>

                <h5>Event Description</h5>
                <textarea className="textarea is-normal" 
                placeholder="event description"
                name="description"
                value={description} onChange={event => setDescription(event.target.value)}/>
                {/* <Link to='/garden' className="button my-4 is-primary">Create</Link> */}
                <button className="button my-4 is-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default EventForm

// hooks for state changes (inputs - setDate etc, use state)
// hooks replaces class based components
// context replaces redux

// submit button calls an 
// onclick calls my API to save info to DB