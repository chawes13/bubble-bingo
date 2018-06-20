const Address = require('./address')
const Board = require('./board')
const Event = require('./event')
const FreeSpace = require('./free-space')
const shuffle = require('../../shuffle')
const {getRandomEvents} = require('../api/meetup-api')

Event.belongsTo(Address)
Address.hasMany(Event)

// Eventually refactor this to represent a Many-to-Many relationship
Event.belongsTo(Board)
Board.hasMany(Event)

Board.belongsTo(FreeSpace)
FreeSpace.hasMany(Board)

//-----Class Methods-------
FreeSpace.getRandom = function () {
  return this.findAll()
    .then((spaces) => shuffle(spaces)[0])
}

Event.getRandomSet = function (numSpaces) {
  return this.findAll()
    .then((spaces) => shuffle(spaces).slice(0, numSpaces))
}

Board.createBoard = async function (month = (new Date()).getMonth(), numSpaces = 25) {
  const freeSpace = await FreeSpace.getRandom()
  const eventsToCreate = await getRandomEvents(month, numSpaces - 1) //await Event.getRandomSet(numSpaces - 1)
  const events = await Promise.all(eventsToCreate.map(event => Event.create(event, { include: [Address] })))

  return this.create({ month })
    .then((board) => board.setFreespace(freeSpace))
    .then(async (board) => {
      const orderedEvents = await Promise.all(events.map(async (event, ind) => {
        const sequence = ind >= 12 ? ind + 1 : ind
        event = await event.update({sequence})
        return event
      }))
      return board.setEvents(orderedEvents)
    })
    .catch((error) => console.error(error))
}

module.exports = {
  Address,
  Board,
  Event,
  FreeSpace,
}
