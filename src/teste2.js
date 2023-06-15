const UserModel = require('./models/User')

module.exports = function (req, res) {
  const { name, job } = req.body

  const user = UserModel.findOne({ $key: 'name', $value: name })

  if (user) {
    return res.status(400).send('Já existe um usuário com esse nome.')
  }

  if (!name || !job) {
    return res.status(400).send('Não foi possível criar um novo usuário.')
  }

  const User = new UserModel({ name, job })
  const newUser = User.save()

  return res.send(newUser)
}
