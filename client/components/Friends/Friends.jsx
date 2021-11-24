import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchFriends } from './friendsHelper'
import { setCurrentFriend } from '../../actions'

import Icon from '../Icon/Icon'
import DataRowText from '../DataRow/DataRowText'

function Friends (props) {
  const id = 10001

  useEffect(() => {
    fetchFriends(props.dispatch, id)
  }, [])

  return (
    <>
      <h1>My friends</h1>
      <p>Follow a new friend:</p>
      <form action="">
        <label htmlFor="uniqueCode">
          <input type="text" placeholder='User unique code'/>
        </label>
        <button>FIND</button>

      </form>
      <p>My existing friends:</p>
      {!props.friends.length && (
        <p>Instructions for adding a new friend</p>)}
      {props.friends.map(friend => (
        <div className='data-row' key={friend.id} onClick={() => props.dispatch(setCurrentFriend(friend))}>
          <Link to={`/friends/${friend.id}`}><Icon style='user' /></Link>
          <DataRowText link={`/friends/${friend.id}`} title={friend.nickname} subtitle={`${friend.name} ${friend.lastName}`} />
        </div>
      ))}
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    friends: globalState.friends
  }
}

export default connect(mapStateToProps)(Friends)
