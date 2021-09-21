import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import AddSong from './AddSong'
// import Auth from './Auth'
import Friends from './Friends'
import Songs from './Songs'
import UpdateSong from './UpdateSong'
import FriendSongs from './FriendSongs'
import Header from './Header'
import Tagline from './Tagline'

function App () {
  return (
    <>
      <div className='app'>
        <Header />
        {/* <Route exact path='/' component={Auth} /> //waiting Auth team creating this component */}
        <Route exact path='/friends' component={Friends} />
        <Route path='/friends/:id' component={FriendSongs} />
        <Route path='/songs/add' component={AddSong} />
        <Route path='/songs/update/:id' component={UpdateSong} />
        <Route exact path='/songs' component={Songs} />
        <Route exact path='/' component={Tagline} />
      </div>
    </>
  )
}

export default connect()(App)
