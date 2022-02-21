const { encode } = require('./emailTokens')
const log = require('../logger')

function sendNotification(userdata, eventdata) {
  const token = encode({
    userId: userdata.id,
    eventId: eventdata.id,
    gardenId: eventdata.gardenId,
  })
  const http = require('https')

  const options = {
    method: 'POST',
    hostname: 'api.sendgrid.com',
    port: null,
    path: '/v3/mail/send',
    headers: {
      authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'content-type': 'application/json',
    },
  }

  const req = http.request(options, function (res) {
    const chunks = []

    res.on('data', function (chunk) {
      chunks.push(chunk)
    })

    res.on('end', function () {
      const body = Buffer.concat(chunks)
      log(body.toString())
    })
  })

  req.write(
    JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: userdata.email,
              name: userdata.firstName,
            },
          ],
          dynamic_template_data: {
            name: userdata.firstName,
            id: userdata.id,
            title: eventdata.title,
            date: eventdata.date,
            description: eventdata.description,
            volunteersneeded: eventdata.volunteersNeeded,
            token: token,
          },
          subject: 'New event in the garden!',
        },
      ],
      from: {
        email: 'admin@gardenz.eda.nz',
        name: 'Gardenz',
      },
      reply_to: {
        email: 'reply@gardenz.eda.nz',
        name: 'Gardenz',
      },
      template_id: 'd-5f8909decdc94fa08d818b740e47a025',
    })
  )
  req.end()
}

module.exports = {
  sendNotification,
}
