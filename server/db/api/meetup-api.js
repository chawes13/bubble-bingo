const axios = require('axios')
const moment = require('moment')
const shuffle = require('../../shuffle')
if (process.env.NODE_ENV !== 'production') require('../../../secrets')

const getDates = (month) => {
  let startDate
  // Take the current date if the board is created AFTER the month has already started
  if (month === moment().month()) {
    startDate = moment()
  } else {
    startDate = moment(month + 1, 'MM') // keep using months indexed at 0
  }
  let endDate = startDate.clone().endOf('month')

  return [startDate, endDate]
}

const mapEventData = (events) => {
  return events.map(event => {
    const eventFields = {
      name: event.name,
      description: event.description,
      date: new Date(event.local_date),
      duration: event.duration,
      cost: event.fee ? event.fee.amount : 0,
      hostName: event.group.name,
      link: event.link,
      source: 'meetup.com',
    }

    if (event.venue) {
      eventFields.address = {
        name: event.venue.name,
        address_1: event.venue.address_1,
        city: 'Chicago',
        state: 'Illinois',
        country: 'US'
      }
    }

    return eventFields
  })
}

const request = (start, resultLimit) => {
  return axios.get(`https://api.meetup.com/find/upcoming_events?&key=${process.env.MEETUP_API_KEY}&photo-host=public&start_date_range=${start.toISOString().slice(0, -1)}&end_date_range=${start.clone().add(7, 'days').toISOString().slice(0, -1)}&radius=5&order=time&page=${resultLimit}`)
}

const getRandomEvents = async (month, numSpaces) => {
  const [start, end] = getDates(month)
  const resultLimit = 250

  const { data: weekOne } = await request(start, resultLimit)
  const { data: weekTwo } = await request(start.clone().add(1, 'w'), resultLimit)
  const { data: weekThree } = await request(start.clone().add(2, 'w'), resultLimit)
  const { data: weekFour } = await request(start.clone().add(3, 'w'), resultLimit)
  const publicEvents = [...weekOne.events, ...weekTwo.events, ...weekThree.events, ...weekFour.events].filter(event => event.visibility === 'public')

  const randomSubset = shuffle(publicEvents).slice(0, numSpaces)
  const mappedEvents = mapEventData(randomSubset)

  return mappedEvents
}



module.exports = {
  getRandomEvents,
}


