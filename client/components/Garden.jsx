import React from 'react'
import { connect } from 'react-redux'

import Map from './Map'
import Events from './Events'

import { getUserGarden } from '../api/gardens'

class Garden extends React.Component {
  state = {
    name: '',
    description: '',
    url: ''
  }

  componentDidMount () {
    const { gardenId } = this.props.user
    gardenId && getUserGarden(gardenId)
      .then(res => {
        const { name, description, url } = res
        this.setState({
          name,
          description,
          url
        })
        return null
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }

  render () {
    const { name, description, url } = this.state
    return (
      <>
        <div className="column">
          <h3>{name}</h3>
          <p className="mb-4">{description}</p>
          <a className="word-wrap" href={url}>{url}</a>
          <Events />
        </div>
        <Map/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Garden)
