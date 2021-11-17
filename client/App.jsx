import React from 'react'
import { connect } from 'react-redux'

import Register from './components/Register'
import SignIn from './components/SignIn'
import { Route } from 'react-router-dom'
import AddSong from './components/AddSong'
import Friends from './components/Friends'
import Songs from './components/Songs'
import UpdateSong from './components/UpdateSong'
import FriendSongs from './components/FriendSongs'
import Header from './components/Header'
import Tagline from './components/Tagline'

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
        <Route path='/register' component={Register}/>
        <Route path='/signIn' component={SignIn}/>
      </div>
    </>
  )
}

export default connect()(App)
