const data = require('./fakeData')

module.exports = function (req, res) {
  const { id } = req.query
  const { name, job } = req.body

  const user = data.find((user) => user.id == id)

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  user.name = name
  user.job = job

  res.send(user)
}
