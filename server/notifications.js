require('dotenv').config()
const jwt = require('jsonwebtoken')
function sendNotification (userdata, eventdata) {
  console.log(userdata)
  console.log(userdata.email)
  console.log(eventdata)
  const token = jwt.sign({ user_id: userdata.id, event_id: eventdata.id }, process.env.JWT_SECRET)
  const http = require('https')

  const options = {
    method: 'POST',
    hostname: 'api.sendgrid.com',
    port: null,
    path: '/v3/mail/send',
    headers: {
      authorization: `Bearer ${process.env.SENDGRID_API_KEY_MARIANO}`,
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
          title: eventdata.title,
          date: eventdata.date,
          description: eventdata.description,
          volunteersneeded: eventdata.volunteersNeeded,
          url: token
        },
        subject: 'New event in the garden!'
      }
    ],
    from: {
      email: 'zeppamariano@gmail.com',
      name: 'Gardenz'
    },
    reply_to: {
      email: 'zeppamariano@gmail.com',
      name: 'Gardenz'
    },
    template_id: 'd-459f20360d9e46acade3c36f6e66f259'
  }))
  req.end()
}

module.exports = {
  sendNotification
}
