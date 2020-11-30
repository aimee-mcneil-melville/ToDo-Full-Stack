import React from 'react'
import { editEvent, getEventById } from '../api/events'

class EditEvent extends React.Component {
  state = {
    title: '',
    date: '',
    volunteers: 0,
    description: ''
  }

  componentDidMount () {
    getEventById(this.props.match.params.id)
      .then((res) => {
        // eslint-disable-next-line camelcase
        const { title, date, volunteers_needed, description } = res
        return this.setState({
          title: title,
          date: date,
          volunteers: volunteers_needed,
          description: description
        })
      })
      .catch((err) => console.error(err))
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
    const { title, date, volunteers, description } = this.state
    return (
      <>
        <div className="edit-event-form columns is-8">
          <div className="column">
            <h1>Kelmarna Gardens</h1>
            <label>Edit this event</label>
            <form>
              <h5>Event Title</h5>
              <input
                className="input is-normal"
                type="text"
                placeholder="event title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />

              <h5>Date</h5>
              <input
                className="input is-normal"
                // Just need to work on the format of the date
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />

              <h5>Volunteers Needed</h5>
              <input
                className="input is-normal"
                type="number"
                name="volunteers"
                min="0"
                value={this.state.volunteers}
                onChange={this.handleChange}
              />

              <h5>Event Description</h5>
              <textarea
                className="textarea is-normal"
                placeholder="event description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />

              <button
                className="button my-4 is-primary"
                onClick={this.handleSubmit}
              >Update Event</button>
            </form>
          </div>

          <div className="event-preview column">
            <h1>Event Preview</h1>
            <div className="box">
              {title === ''
                ? <p>Your title here</p>
                : <p>{title}</p>
              }
              {date === ''
                ? <p>Your date here</p>
                : <p>{date}</p>
              }
              {volunteers === 0
                ? <p>Number of volunteers</p>
                : <p>{volunteers} volunteers needed</p>
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
