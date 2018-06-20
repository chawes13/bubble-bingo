const { events } = require('./events.json')

const freeSpaceData = [
  {description: "Call someone you haven't talked to in a while"},
  {description: "Call a family member and tell them you love them"},
  {description: "Invite a homeless person to a quick meal"},
  {description: "Compliment a friend or colleague about something non-physical"},
  {description: "Thank someone who has positively influenced you"},
  {description: "Pick up trash from the sidewalk"},
  {description: "Buy coffee for the person in-line behind you"},
  {description: "Leave encouraging notes in public places"},
  {description: "Volunteer for an hour at an organization of your choosing"},
  {description: "Find unused stuff at your home and donate it to charity"},
  {description: "Donate blood"},
  {description: "Treat a friend to dinner or coffee"},
  {description: "Hold the door open for a stranger"},
  {description: "Pay for someone's public transit fare"},
  {description: "Buy a small gift for a friend or family member - just because"},
  {description: "Put change in parking meteres that are about to expire"},
  {description: "Visit a nursing home"},
  {description: "Write a nice online review about a restaurant you went to recently"},
  {description: "Compliment a stranger"},
  {description: "Send someone a handwritten letter"},
  {description: "Bring baked goods to your local volunteer fire department"},
  {description: "Bring in food / snacks for your coworkers - just because"},
  {description: "Ask a cashier, server, or receptionist about their day"},
]

const eventData = events.filter(event => event.visibility === 'public').map(event => {
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

module.exports = {
  freeSpaceData,
  eventData
}
