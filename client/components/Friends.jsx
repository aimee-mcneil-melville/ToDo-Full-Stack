import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchFriends } from './appHelper'
import { connect } from 'react-redux'
import Icon from './Icon'
import DataRowText from './DataRowText'

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
      {/* <form>
        <input type="text" />
      </form> */}
      {props.friends.map(friend => (
        <div className='data-row' key={friend.id}>
          <Link to={`/friends/${friend.id}`}><Icon style='user' /></Link>
          <DataRowText link={`/friends/${friend.id}`} title={friend.nickname} subtitle={`${friend.name} ${friend.lastName}`} />
        </div>
        // <li key={friend}><Link to={`/friends/${friend.id}`}><button>icon</button>{friend.nickname}
        //   <br /> {friend.name} {friend.lastName} </Link>X</li>
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
