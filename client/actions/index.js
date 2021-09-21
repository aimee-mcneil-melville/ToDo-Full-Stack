import { getSongs } from '../apis/media'
import { getFriends } from '../apis/friends'

export const SET_FRIENDS_SUCCESS = 'SET_FRIENDS_SUCCESS'
export const SET_FRIENDS_PENDING = 'SET_FRIENDS_PENDING'
export const SET_ERROR = 'SET_ERROR'

export const SET_SONGS_SUCCESS = 'SET_SONGS_SUCCESS'
export const SET_SONGS_PENDING = 'SET_SONGS_PENDING'

// export const SET_USERS_SUCCESS = 'SET_USERS_SUCCESS'
// export const SET_USERS_PENDING = 'SET_USERS_PENDING'

export function setFriendsSuccess (friends) {
  return {
    type: SET_FRIENDS_SUCCESS,
    friends
  }
}

export function setFriendsPending () {
  return {
    type: SET_FRIENDS_PENDING
  }
}

export function setFriends (id) {
  return (dispatch) => {
    dispatch(setFriendsPending())
    return getFriends(id)
      .then(() => {
        dispatch(setFriendsSuccess())
        return null
      })
      .catch(err => {
        console.error('Friend not found', err.message)
      })
  }
}

export function setSongsSuccess (songs) {
  return {
    type: SET_SONGS_SUCCESS,
    songs
  }
}

export function setSongsPending () {
  return {
    type: SET_SONGS_PENDING
  }
}

export function setSongs (id) {
  return (dispatch) => {
    dispatch(setSongsPending())
    return getSongs(id)
      .then(() => {
        dispatch(setSongsSuccess())
        return null
      })
      .catch(err => {
        console.error('Song not found', err.message)
      })
  }
}

// export function setUsers (songs) {
//   return {
//     type: SET_USERS_SUCCESS,
//     songs
//   }
// }

// export function setUsersPending () {
//   return {
//     type: SET_SONGS_PENDING
//   }
// }

export function setError (errMessage) {
  return {
    type: SET_ERROR,
    errMessage
  }
}
