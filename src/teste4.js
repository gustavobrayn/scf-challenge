const data = require('./fakeData')

module.exports = function (req, res) {
  const { id } = req.query
  const { name, job } = req.body

  const user = data.find((user) => user.id == id)

  user.name = name
  user.job = job

  res.send(user)
}
