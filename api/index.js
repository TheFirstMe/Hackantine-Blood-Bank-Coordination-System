// const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { name = 'World' } = req.query;
  console.log(res.query)
  res.status(200).send(data)
}
