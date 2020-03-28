const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { name = 'World' } = req.query

  const response = await fetch(`http://bloodgcek-api.eastus.cloudapp.azure.com/api/user/login`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=ee&password=dd`
  })
  // console.log(response)
  const data = await response.json();

  res.status(200).send(data)
}
