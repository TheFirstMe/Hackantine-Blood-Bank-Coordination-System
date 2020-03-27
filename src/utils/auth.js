const isBrowser = typeof window !== `undefined`

const getUser = () =>
  window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}

const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

export async function handleLogin({ email, password }) {
  if (!isBrowser) return false
  try {


    const response = await fetch(`${process.env.GATSBY_API_URL}/user/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'Access-Control-Allow-Origin': '*'
      },
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json'
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
      body: `email=${email}&password=${password}`
    })
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    if (data.acccess_token) {
      console.log(`Credentials match! Setting the active user.`)
      return setUser(data)
    }
    console.log(`Invalid Credentials!`)
    return false
  }
  catch(err) {
    console.log(err)
  }
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()

  return !!user.acccess_token
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  setUser({})
  callback()
}

