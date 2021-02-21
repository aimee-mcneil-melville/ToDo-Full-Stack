require('dotenv').config()

function sendNotification (userdata, eventdata) {
  console.log(userdata)
  console.log(userdata.email)
  console.log(eventdata)

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
            email: userdata.email,
            name: userdata.username
          }
        ],
        dynamic_template_data: {
          name: userdata.username,
          id: userdata.id,
          gardenID: eventdata.gardenID,
          eventID: eventdata.id,
          title: eventdata.title,
          date: eventdata.date,
          description: eventdata.description,
          volunteersneeded: eventdata.volunteersneeded
        },
        subject: 'New event in the garden!'
      }
    ],
    from: {
      email: 'zeppamariano@gmail.com',
      name: 'Gardenz'
    },
    reply_to: {
      email: 'noreply@johndoe.com',
      name: 'Gardenz'
    },
    template_id: 'd-78cba85ace40431b84f04f35d9f51f8d'
  }))
  req.end()
}

module.exports = {
  sendNotification
}
