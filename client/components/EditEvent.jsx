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
        <div className="column form">
          <div className="column is-two-fifths pl-0 is-pulled-left">
            <h2 className='mb-6'>Kelmarna Gardens</h2>
            <h2>Edit this event</h2>
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
                name="volunteers"
                min="0"
                value={this.state.volunteers}
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

          <div className="column is two-fifths is pulled-right">
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
