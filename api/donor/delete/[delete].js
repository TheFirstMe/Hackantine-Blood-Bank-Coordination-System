const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method && req.method !== "POST") {
      res.status(405).send('405 Method Not Allowed')
      return
    }

    const { authorization = "Bearer " } = req.headers
    const donorID = req.query.delete
    // res.status(200).send({userID: userID})
    // return 
    const apiResponse = await fetch(`${process.env.API_URL}/donar/delete`, {
      method: 'POST',
      headers: {
        "Authorization": `${authorization}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `donar_id=${donorID}`
    })

    const data = await apiResponse.json();
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
