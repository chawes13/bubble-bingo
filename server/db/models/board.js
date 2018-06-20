const Sequelize = require('sequelize')
const db = require('../')

const Board = db.define('boards', {
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  freeSpaceCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  numAttended: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  hasBingo: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  monthDisplay: {
    type: Sequelize.VIRTUAL,
    get () {
      const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'Decemeber',
      }
      return months[this.getDataValue('month')]
    }
  }
})

module.exports = Board
