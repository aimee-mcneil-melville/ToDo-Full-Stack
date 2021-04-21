export const SET_FRIENDS = 'SET_FRIENDS'
export const SET_FRIENDS_PENDING = 'SET_FRIENDS_PENDING'
export const SET_ERROR = 'SET_ERROR'

export function setFriends (friends) {
  return {
    type: SET_FRIENDS,
    friends
  }
}

export function getFriendsPending () {
  return {
    type: SET_FRIENDS_PENDING
  }
}

export function setError (errMessage) {
  return {
    type: SET_ERROR,
    errMessage
  }
}
