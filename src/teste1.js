const data = require('./fakeData')

const getUser = (req, res) => {
  const { name } = req.query

  const user = data.find((user) => user.name === name)

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  return res.send(user)
}

const getUsers = (req, res) => {
  return res.send(data)
}

module.exports = {
  getUser,
  getUsers,
}
