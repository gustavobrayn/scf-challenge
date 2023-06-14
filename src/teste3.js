const data = require('./fakeData')

module.exports = function (req, res) {
  const { name } = req.query

  const userIndex = data.findIndex((user) => user.name === name)
  const userNotFound = userIndex === -1

  if (userNotFound) {
    return res.status(404).send('Usuário não encontrado.')
  }

  data.splice(userIndex, 1)

  return res.send('Sucesso.')
}
