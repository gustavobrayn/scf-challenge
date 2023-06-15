const app = require('./app')

const port = 3000
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${port}`)
})
