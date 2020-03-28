const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method && req.method !== "POST") {
      res.status(405).send('405 Method Not Allowed')
      return
    }

    let email, password
    if (req.body) {
      email = req.body.email
      password = req.body.password
    }

    const apiResponse = await fetch(`http://bloodgcek-api.eastus.cloudapp.azure.com/api/user/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`
    })

    const data = await apiResponse.json();
    const status = data["status_code"]
    const accessToken = data["access_token"]
    const { user, message } = data

    if (status === 200) {
      res.status(200).send({
        user: user,
        accessToken: accessToken
      })
    }
    else {
      res.status(200).send({message: message})
    }
  }
  catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
