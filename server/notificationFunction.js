require('dotenv').config()

function sendNotification (userdata, eventdata) {
  console.log(userdata)
  const { email, name, id } = userdata
  console.log(userdata[0].email)
  const http = require('https')

  const options = {
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

  const req = http.request(options, function (res) {
    const chunks = []

    res.on('data', function (chunk) {
      chunks.push(chunk)
    })

    res.on('end', function () {
      const body = Buffer.concat(chunks)
      console.log(body.toString())
    })
  })

  req.write(JSON.stringify({
    personalizations: [
      {
        to: [
          {
            email: userdata[0].email,
            name: name
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
}

module.exports = {
  sendNotification
}
