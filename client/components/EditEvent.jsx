import React from 'react'

class EditEvent extends React.Component {
  state = {
    title: '',
    date: '',
    volunteers: 0,
    description: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // implement submit
  }

  render () {
    const { title, date, volunteers, description } = this.state
    return (
      <>
        <div className="edit-event-form columns is-8">
          <div className="column">
            <h1>Kelmarna Gardens</h1>
            <h3>Edit this event</h3>
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
                type="datetime-local"
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
                : <p>{volunteers}</p>
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
