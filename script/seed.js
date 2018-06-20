const db = require('../server/db')
const { Address, Event, FreeSpace, Board } = require('../server/db/models')
const { freeSpaceData, eventData } = require('./seed-data')
// if (process.env.NODE_ENV !== 'production') require('../secrets')

async function seed () {
  console.log('Seeding...')

  await Promise.all(freeSpaceData.map(freeSpace => {
    return FreeSpace.create(freeSpace)
  }))

/*   await Promise.all(eventData.map(event => {
    return Event.create(event, { include: [Address] })
  })) */

  //await Board.createBoard(6)
}

db.sync({force: true})
  .then(() => {
    return seed()
  })
  .then(() => {
    console.log('Seeded successfully')
  })
  .catch((error) => {
    console.error('Error seeding:', error)
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
  })
