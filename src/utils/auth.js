const isBrowser = typeof window !== `undefined`

const getUser = () =>
  window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}

const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

export async function handleLogin({ email, password }) {
  if (!isBrowser) return false
  try {
    const user = JSON.stringify({ email: email, password: password })
    console.log(user)
    const response = await fetch(`/api/user/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: user
    })
    // console.log(JSON.stringify({email: email, password: password}))
    const data = await response.json();
    // console.log(data)
    if (data.accessToken) {
      console.log(`Credentials match! Setting the active user.`)
      return setUser(data)
    }
    console.log(`Invalid Credentials!`)
    return false
  }
  catch (err) {
    console.log(err)
  }
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()

  return !!user.accessToken
}

export const getCurrentUser = () => isBrowser && getUser()

export const getUserID = () => {
  if (!isBrowser) return false

  const userData = getUser()

  return userData.user.id
}

export const isAdmin = () => {
  if (!isBrowser) return false

  const userData = getUser()
  if (userData.user["permission_id"] === 1) {
    return true
  }
  return false
}

export const getAccessToken = () => {
  if (!isBrowser) return false

  const user = getUser()

  return user.accessToken
}

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  setUser({})
  callback()
}

