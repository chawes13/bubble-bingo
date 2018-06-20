const Sequelize = require('sequelize')
const db = require('../')

const Address = db.define('addresses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lat: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
  lon: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
  address_1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Address
