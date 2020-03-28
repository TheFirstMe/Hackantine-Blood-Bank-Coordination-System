const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method && req.method !== "GET") {
      res.status(405).send('405 Method Not Allowed')
      return
    }

    const { authorization = "Bearer " } = req.headers

    const apiResponse = await fetch(`${process.env.API_URL}/donar/all`, {
      method: 'GET',
      headers: {
        "Authorization": `${authorization}`
      }
    })

    const data = await apiResponse.json();
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
