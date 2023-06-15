const User = require('./models/User')

module.exports = function (req, res) {
  const { id } = req.query
  const { name, job } = req.body

  if (!name || !job) {
    return res.status(400).send('Não foi possível atualizar o usuário.')
  }

  const user = User.findOneAndUpdate(
    { $key: 'id', $value: Number(id) },
    { name, job }
  )

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  return res.send(user)
}
