const User = require('./models/User')

module.exports = function (req, res) {
  const { name } = req.query

  const user = User.findOne({ $key: 'name', $value: name })

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  if (!user.viewedTimes) {
    return res.send(`Usuário ${user.name} não foi lido nenhuma vez.`)
  }

  return res.send(`Usuário ${user.name} foi lido ${user.viewedTimes} vezes.`)
}
