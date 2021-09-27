import { getSongs } from '../apis/media'
import { getFriends } from '../apis/friends'

export const SET_FRIENDS = 'SET_FRIENDS'
export const SET_FRIENDS_PENDING = 'SET_FRIENDS_PENDING'
export const SET_ERROR = 'SET_ERROR'

export const SET_SONGS = 'SET_SONGS'
export const SET_SONGS_PENDING = 'SET_SONGS_PENDING'
export const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND'
export const SET_CURRENT_FRIEND_SONGS = 'SET_CURRENT_FRIEND_SONGS'

// export const SET_USERS_SUCCESS = 'SET_USERS_SUCCESS'
// export const SET_USERS_PENDING = 'SET_USERS_PENDING'

// user actions


// userSongs actions

export function setSongsSuccess (songs) {
  return {
    type: SET_SONGS,
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
      .then(songs => {
        dispatch(setSongsSuccess(songs))
        return null
      })
      .catch(err => {
        console.error('Song not found', err.message)
      })
  }
}

// friends actions

export function setFriendsPending () {
  return {
    type: SET_FRIENDS_PENDING
  }
}

export function setFriendsSuccess (friends) {
  return {
    type: SET_FRIENDS,
    friends
  }
}

export function setFriends (id) {
  return (dispatch) => {
    dispatch(setFriendsPending())
    return getFriends(id)
      .then((friends) => {
        dispatch(setFriendsSuccess(friends))
        return null
      })
      .catch(err => {
        console.error('Friend not found', err.message)
      })
  }
}

// *** currentFriend actions

export function setCurrentFriend (friend) {
  return {
    type: SET_CURRENT_FRIEND,
    friend
  }
}

// *** currentfriendSongs actions

export function setCurrentFriendSongsSuccess (songs) {
  return {
    type: SET_CURRENT_FRIEND_SONGS,
    songs
  }
}

// export function setCurrentFriendSongs (dispatch, id) {
//   console.log('action:', id)
//   return (dispatch) => {
//     dispatch(setSongsPending())
//     return getSongs(id)
//       .then(songs => {
//         dispatch(setCurrentFriendSongsSuccess(songs))
//         return null
//       })
//       .catch(err => {
//         console.error('Song not found', err.message)
//       })
//   }
// }

export function setCurrentFriendSongs (dispatch, id) {
  dispatch(setSongsPending())
  return getSongs(id)
    .then(songs => {
      dispatch(setCurrentFriendSongsSuccess(songs))
      return null
    })
    .catch(err => {
      console.error('Song not found', err.message)
    })
}

// *** error actions
export function setError (errMessage) {
  return {
    type: SET_ERROR,
    errMessage
  }
}
