import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import AddSong from './components/AddSong/AddSong'
import Friends from './components/Friends/Friends'
import Songs from './components/Songs/Songs'
import UpdateSong from './components/UpdateSong/UpdateSong'
import FriendSongs from './components/Friends/FriendSongs'
import Header from './components/Header/Header'
import Tagline from './components/Tagline/Tagline'

function App () {
  return (
    <>
      <div className='app'>
        <Header />
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
