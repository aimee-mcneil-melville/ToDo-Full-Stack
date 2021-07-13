const axios = require('axios')

/**
 * @param uid Auth0 user id
 * @param token Auth0 token for user
 * @returns {Promise<{error?}|string>} promise either resolves to the users role or a rejects with API error
 */
const getUserRoles = async (uid, token) => {
  const instance = axios.create({
    baseURL: 'https://gardenz.au.auth0.com/api/v2/',
    timeout: 1000,
    headers: {
      authorization: `bearer ${token}`
    }
  })

  try {
    const { data } = await instance.get(`/users/${uid}/roles`)
    return data[0].name
  } catch (error) {
    return {
      error: error.message
    }
  }
}

/**
 *
 * @param uid Auth0 user id
 * @param token Auth0 token for user
 * @returns {Promise<boolean>} evaluates based on user roles from getUserRoles() above
 */
const getIsAdmin = async (uid, token) => {
  return await getUserRoles(uid, token) === 'admin'
}

module.exports = {
  getUserRoles,
  getIsAdmin
}
