const data = require('./fakeData')

module.exports = function (req, res) {
  const { name, job } = req.body

  const newUser = {
    name,
    job,
  }

  data.push(newUser)

  return res.send(newUser)
}
