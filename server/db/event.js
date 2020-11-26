const connection = require('./connection')

module.exports = {
  getEvents,
  addEvent
}

function getEvents(){
    return db('events').select('id','garden_id','title','date','description','volunteers_needed')
}
function addEvent (newEvent, db = connection) {
    return db('events')
        .insert(newEvent)
}

