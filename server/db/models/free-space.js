const Sequelize = require('sequelize')
const db = require('../')

const FreeSpace = db.define('freespaces', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Free Space'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})

module.exports = FreeSpace
