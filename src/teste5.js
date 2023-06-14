const data = require('./fakeData')

module.exports = function (req, res) {
  const { name } = req.query

  const user = data.find((user) => user.name === name)

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  if (!user.viewedTimes) {
    return res.send(`Usuário ${user.name} não foi lido nenhuma vez.`)
  }

  return res.send(`Usuário ${user.name} foi lido ${user.viewedTimes} vezes.`)
}
