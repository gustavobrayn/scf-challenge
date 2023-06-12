const data = require('./fakeData')

const getUser = (req, res) => {
  const { name } = req.query

  const user = data.find((user) => user.name === name)

  return res.send(user)
}

const getUsers = (req, res) => {
  return res.send(data)
}

module.exports = {
  getUser,
  getUsers,
}
