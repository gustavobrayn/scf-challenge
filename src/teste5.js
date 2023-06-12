const data = require('./fakeData')

module.exports = function (req, res) {
  const { name } = req.query

  const user = data.find((user) => user.name === name)

  res.send(`Usuário ${user.name} foi lido ${user.viewedTimes} vezes.`)
}
