const data = require('../fakeData')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Não autorizado')
  }

  const encoded = req.headers.authorization.split(' ')[1]
  const decoded = new Buffer.from(encoded, 'base64').toString()
  const name = decoded.split(':')[0]

  const user = data.find((user) => user.name === name)

  if (!user) {
    return res.status(401).send('Não autorizado.')
  }

  const hasPermissionToDelete = user.allowedActions.includes('delete')
  const hasPermissionToUpdate = user.allowedActions.includes('update')

  switch (req.method) {
    case 'DELETE':
      if (hasPermissionToDelete) {
        return next()
      }
      break
    case 'PUT':
      if (hasPermissionToUpdate) {
        return next()
      }
      break
  }
}
