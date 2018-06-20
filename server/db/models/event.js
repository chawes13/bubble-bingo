const Sequelize = require('sequelize')
const db = require('../')

const Event = db.define('events', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    }
  },
  duration: {
    type: Sequelize.BIGINT,
    allowNull: true,
    // add setter to convert to hours
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    // add getter / setter to convert to dollars
  },
  hostName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  source: {
    type: Sequelize.ENUM('meetup.com', 'facebook', 'custom'),
    allowNull: false,
  },
  attended: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sequence: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
})

module.exports = Event
