import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchFriends } from './appHelper'
import { connect } from 'react-redux'

function Friends (props) {
  const id = 10001

  useEffect(() => {
    fetchFriends(props.dispatch, id)
  }, [])
  console.log(props.friends)

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
      {/* <form>
        <input type="text" />
      </form> */}
      <ul>
        {props.friends.map(friend => (
          <li key={friend}><Link to={`/friends/${friend.id}`}><button>icon</button>{friend.nickname}
          <br /> {friend.name} {friend.lastName} {...friend}</Link>X</li> 
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    friends: globalState.friends
  }
}

export default connect(mapStateToProps)(Friends)
