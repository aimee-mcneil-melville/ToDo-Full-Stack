import React from 'react'
import { connect } from 'react-redux'

import Auth from './Auth'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import { Route } from 'react-router-dom'
import AddSong from './AddSong'
import Friends from './Friends'
import Media from './Media'
import UpdateSong from './UpdateSong'
import FriendSongs from './FriendSongs'
import Header from './Header'
import Tagline from './Tagline'

function App () {
  return (
    <>
      <div className='app'>
        <Header />
        <Route path='/' component={Nav} />
        <Route exact path='/' component={Auth}/>
        <Route path='/friends' component={Friends} />
        <Route path='/friends/:id' component={FriendSongs} />
        <Route path='/media/:id' component={Media} />
        <Route path='/media/update/:songId' component={UpdateSong} />
        <Route path='/media/add' component={AddSong} />
        <Route path='/register' component={Register}/>
        <Route path='/signIn' component={SignIn}/>
        <Route exact path='/' component={Tagline} />

      </div>
    </>
  )
}

export default connect()(App)
