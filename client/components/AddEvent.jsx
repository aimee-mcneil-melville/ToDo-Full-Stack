import React from 'react'
import { addEvent } from '../api/events'
import { showError } from '../actions/error'
import { connect } from 'react-redux'

class AddEvent extends React.Component {
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
    const newEvent = {
      ...this.state,
      gardenId: this.props.gardenId
    }

    return addEvent(newEvent)
      .then(() => {
        this.props.history.push('/garden')
        return null
      })
      .catch((error) => {
        this.props.dispatch(showError(error.message))
      })
  }

  render () {
    return (
      <>
        <div className="column form">
          <form className='column is-two-fifths pl-0 is-pulled-left'>
            <h2 className='mb-6'>Create New Event</h2>
            <label className='label'>Event Title</label>
            <input
              className="input is-normal"
              type="text"
              placeholder="Event Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            <h5 className='label'>Date</h5>
            <input
              className="input is-normal"
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />

            <label className='label'>Volunteers Needed</label>
            <input
              className="input is-normal"
              type="number"
              name="volunteers"
              value={this.state.volunteers}
              onChange={this.handleChange}
            />

            <label className='label'>Event Description</label>
            <textarea
              className="textarea is-normal"
              placeholder="Event Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />

            <button
              className="button mt-6"
              onClick={this.handleSubmit}
            >Create</button>
          </form>

          <div className="column is-two-fifths is-pulled-right">
            <div className='eventPreview'>
              <h1 className='mb-6'>Event Preview</h1>
              <div className="box mt-78">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quasi, harum omnis a non, voluptas quam ipsam possimus iure ipsa est, aut error doloribus saepe aliquam nostrum fuga! Aperiam, non.
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    gardenId: state.user.gardenId,
    error: state.error
  }
}

export default connect(mapStateToProps)(AddEvent)
