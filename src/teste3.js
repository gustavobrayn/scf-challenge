const data = require('./fakeData')

module.exports = function (req, res) {
  const { name } = req.query

  const userIndex = data.findIndex((user) => user.name === name)

  data.splice(userIndex, 1)

  res.send('success')
}
