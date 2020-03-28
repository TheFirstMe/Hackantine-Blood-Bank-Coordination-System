const fetch = require('node-fetch');

module.exports = async (req, res) => {
  let dono = req.query.donor
  try {
    if (req.method && req.method !== "GET") {
      res.status(405).send('405 Method Not Allowed')
      return
    }

    const donorID = req.query.donor
    const { authorization = "Bearer " } = req.headers

    const apiResponse = await fetch(`${process.env.API_URL}/donar/${donorID}`, {
      method: 'GET',
      headers: {
        "Authorization": `${authorization}`
      }
    })

    const data = await apiResponse.text();
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send(`Internal Server Error`)
  }
}
