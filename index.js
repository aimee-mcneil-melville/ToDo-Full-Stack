var app = require('./server')
var PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log('server listening on port: ', PORT)
})

