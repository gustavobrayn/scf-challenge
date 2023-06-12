const data = require('./fakeData')

module.exports = function (req, res) {
  const { name, job } = req.body

  if (!name || !job) {
    return res.status(400).send('Não foi possível criar um novo usuário.')
  }

  const newUser = {
    name,
    job,
  }

  data.push(newUser)

  return res.send(newUser)
}
