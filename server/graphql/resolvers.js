const { Board, Event } = require('../db/models')

const resolvers = {
  Query: {
    board(root, args) {
      return Board.find({ where: args })
    },
    getSpace(root, args) {
      return Event.findById(args.id)
    }
  },
  Mutation: {
    createBoard(root, { month }) {
      return Board.createBoard(month)
    },
    markAttended(root, args) {
      return Event.update({attended: true},{
        where: args,
        returning: true,
        isPlain: true
      }).then(([_, affectedRows]) => {
        return affectedRows[0]
      })
    },
    markFreeSpace(root, args) {
      return Board.update({freeSpaceCompleted: true}, {
        where: args,
        returning: true,
        isPlain: true,
      }).then(([_, affectedRows]) => affectedRows[0])
    },
  },
  Board: {
    freeSpace(board) {
      return board.getFreespace()
    },
    spaces(board) {
      return board.getEvents()
    }
  },
  Event: {
    location(event) {
      return event.getAddress()
    },
  }
}

module.exports = resolvers;
