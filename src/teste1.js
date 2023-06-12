const data = require('./fakeData')

const getUser = (req, res) => {
  const { name } = req.query

  const user = data.find((user) => user.name === name)

  if (!user) {
    return res.status(404).send('Usuário não encontrado.')
  }

  user.viewedTimes = user.viewedTimes ? user.viewedTimes + 1 : 1

  return res.send(user)
}

const getUsers = (req, res) => {
  data.forEach((user) => {
    user.viewedTimes = user.viewedTimes ? user.viewedTimes + 1 : 1
  })

  return res.send(data)
}

module.exports = {
  getUser,
  getUsers,
}
