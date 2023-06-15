const User = require('./models/User')

module.exports = function (req, res) {
  const { name } = req.query

  const user = User.findOne({ $key: 'name', $value: name })

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  User.delete(name)

  return res.send('Sucesso.')
}
