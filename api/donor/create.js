const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method && req.method !== "POST") {
      res.status(405).send('405 Method Not Allowed')
      return
    }

    const { authorization = "Bearer " } = req.headers
    const { donor } = req.body
    const apiResponse = await fetch(`${process.env.API_URL}/donar/create`, {
      method: 'POST',
      headers: {
        "Authorization": `${authorization}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${donor.name}&age=${donor.age}&blood_group=${donor["blood_group"]}&weight=${donor.weight}&contact_number=${donor["contact_number"]}&home_town=${donor["home_town"]}&district=${donor.district}`
    })

    const data = await apiResponse.json();
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
