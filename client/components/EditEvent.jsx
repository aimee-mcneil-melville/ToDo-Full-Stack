import React from 'react'
import { editEvent } from '../api/events'
import { getEvent } from './editEventHelper'

class EditEvent extends React.Component {
  state = {
    title: '',
    date: '',
    volunteersNeeded: 0,
    description: ''
  }

  componentDidMount () {
    const { id } = this.props.match.params
    return getEvent(id)
      .then((event) => {
        this.setState(event)
        return null
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // implement submit
    const updatedEvent = {
      id: Number(this.props.match.params.id),
      ...this.state
    }
    return editEvent(updatedEvent)
      .then(() => {
        this.props.history.push('/garden')
        return null
      })
  }

  render () {
    const { title, date, volunteersNeeded, description } = this.state
    return (
      <>
        <div className="column form">
          <div className="column is-two-fifths pl-0 is-pulled-left">
            {/* <h2 className='mb-6'>Kelmarna Gardens</h2> */}
            <h2 className="mb-6">Edit This Event</h2>
            <form>
              <h5 className="label">Event Title</h5>
              <input
                className="input is-normal"
                type="text"
                placeholder="event title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />

              <h5 className="label">Date</h5>
              <input
                className="input is-normal"
                // Just need to work on the format of the date
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />

              <h5 className="label">Volunteers Needed</h5>
              <input
                className="input is-normal"
                type="number"
                name="volunteersNeeded"
                min="0"
                value={this.state.volunteersNeeded}
                onChange={this.handleChange}
              />

              <h5 className="label">Event Description</h5>
              <textarea
                className="textarea is-normal"
                placeholder="event description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />

              <button
                className="button mt-6"
                onClick={this.handleSubmit}
              >Update Event</button>
            </form>
          </div>

          <div className="column is-two-fifths is-pulled-right">
            <h1 className="mb-6">Event Preview</h1>
            <div className="eventPreview box mt-78">
              {title === ''
                ? <p>Your title here</p>
                : <p>{title}</p>
              }
              {date === ''
                ? <p>Your date here</p>
                : <p>{date}</p>
              }
              {volunteersNeeded === 0
                ? <p>Number of volunteers</p>
                : <p>{volunteersNeeded} volunteers needed</p>
              }
              {description === ''
                ? <p>Your description here</p>
                : <p>{description}</p>
              }

            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EditEvent
