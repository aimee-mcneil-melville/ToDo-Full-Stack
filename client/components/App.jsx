import React from 'react'
import { connect } from 'react-redux'

// import Auth from './Auth'
// import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import { Route } from 'react-router-dom'
import AddSong from './AddSong'
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
        <Route path='/register' component={Register}/>
        <Route path='/signIn' component={SignIn}/>
      </div>
    </>
  )
}

export default connect()(App)
