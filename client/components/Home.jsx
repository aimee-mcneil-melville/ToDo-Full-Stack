import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Map from './Map'
import { fetchGardens } from './gardenHelper'

class Home extends React.Component {
  state = {
    gardens: []
  }

  componentDidMount () {
    return fetchGardens()
      .then(gardens => {
        this.setState({
          gardens: gardens
        })
        return null
      })
  }

  render () {
    const { gardens } = this.state
    console.log('render > gardens:', gardens)
    return (
      <>
        <div className='column is-half-tablet'>
          <p>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
          <Link className="button is-primary my-4" to={'/garden'}>Garden</Link>
        </div>
        <Map
          gardens={gardens}/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gardens: state.gardens
  }
}

export default connect(mapStateToProps)(Home)
