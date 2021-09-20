import React from 'react'
import { connect } from 'react-redux'

import Auth from './Auth'
import Register from './Register'
import SignIn from './SignIn'
import { Route } from 'react-router-dom'
import AddSong from './AddSong'
import Friends from './Friends'
import Media from './Media'
import Nav from './Nav'
import UpdateSong from './UpdateSong'
import FriendSongs from './FriendSongs'

function App () {
  return (
    <>
      <div className='app'>
        <Route path='/' component={Nav} />
        <Route exact path='/' component={Auth}/>
        <Route path='/friends' component={Friends} />
        <Route path='/friends/:id' component={FriendSongs} />
        <Route path='/media/:id' component={Media} />
        <Route path='/media/update/:songId' component={UpdateSong} />
        <Route path='/media/add' component={AddSong} />
        <Route path='/register' component={Register}/>
        <Route path='/signIn' component={SignIn}/>
      </div>
    </>
  )
}

export default connect()(App)
