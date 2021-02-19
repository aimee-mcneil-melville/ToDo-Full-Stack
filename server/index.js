const server = require('./server')
require('dotenv').config()

// https://stackoverflow.com/a/18024792
const port = process.env.PORT || 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})

var http = require('https')

var options = {
  method: 'POST',
  hostname: 'api.sendgrid.com',
  port: null,
  path: '/v3/mail/send',
  headers: {
    authorization: `Bearer ${process.env.JWT_SECRET}`,
    'content-type': 'application/json'
  }
}

// const data = {

// }

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.write(JSON.stringify({
  personalizations: [
    {
      to: [
        {
          email: 'zeppamariano@gmail.com',
          name: 'John Doe'
        }
      ],
      dynamic_template_data: {
        name: 'Mariano',
        id: '1',
        gardenID: 'Grow this',
        eventID: '5',
        title: 'This is a title',
        date: 'date',
        description: 'This is a description',
        volunteersneeded: '5',
        verb: '',
        adjective: '',
        noun: '',
        currentDayofWeek: ''
      },
      subject: 'Hello, World!'
    }
  ],
  from: {
    email: 'zeppamariano@gmail.com',
    name: 'John Doe'
  },
  reply_to: {
    email: 'noreply@johndoe.com',
    name: 'John Doe'
  },
  template_id: 'd-78cba85ace40431b84f04f35d9f51f8d'
}))
req.end()
