// import { isAuthenticated, getDecodedToken } from './auth'
import { Auth0Client } from '@auth0/auth0-spa-js'

export const auth0 = new Auth0Client({ // await before calling function?
  domain: 'gardenz.au.auth0.com',
  client_id: 'sF7Tf4GqnhENJ7l7gArp5c56ZFZ2WOcL'
  // redirect_uri: window.location.origin delete?
})

export async function isAuthenticated () {
  const authenticated = await auth0.isAuthenticated()
  return authenticated
}

// const emptyUser = { <---- Dont delete?
//   id: null,
//   username: '',
//   isAdmin: false,
//   gardenId: null
// }

export function getUser () {
  // if (isAuthenticated()) {
  // const { username, isAdmin, gardenId, id } = getDecodedToken()
  return {
    username: 'Josh',
    isAdmin: true,
    gardenId: 1,
    id: 2
  }
  // }
  // return emptyUser
}

export async function getAccessToken () {
  try {
    return await auth0.getTokenSilently({
      audience: 'https://garden/nz/api',
      scope: 'read:users'
    })
  } catch (error) {
    if (error.error !== 'login_required') {
      throw error
    }
  }
}

export const login = async () => {
  console.log(await isAuthenticated())

  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  })
}

export const logout = async () => {
  console.log(await isAuthenticated())
  await auth0.logout({
    returnTo: window.location.origin
  })
}
