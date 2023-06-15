const UserModel = require('./models/User')

const getUser = (req, res) => {
  const { name } = req.query

  const user = UserModel.findOne(
    { $key: 'name', $value: name },
    { incrementViewedTimes: true }
  )

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  return res.send(user)
}

const getUsers = (req, res) => {
  const users = UserModel.findAll({ incrementViewedTimes: true })

  return res.send(users)
}

module.exports = {
  getUser,
  getUsers,
}
