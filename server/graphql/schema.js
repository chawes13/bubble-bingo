const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
type Query {
  board(month: Int): Board
  getSpace(id: ID): Event
}

type Mutation {
  createBoard(month: Int): Board
  markAttended(id: ID): Event
  markFreeSpace(id: ID): Board
}

type Address {
  id: ID!
  name: String!
  lat: Float
  lon: Float
  address_1: String!
  address_2: String
  city: String!
  state: String
  country: String!
}

type Board {
  id: ID
  month: Int!
  monthDisplay: String
  score: Int!
  freeSpaceCompleted: Boolean!
  numAttended: Int!
  hasBingo: Boolean!
  freeSpace: FreeSpace!
  spaces: [Event]!
}

type FreeSpace {
  name: String!
  description: String!
}

type Event {
  id: ID!
  name: String!
  description: String
  date: String
  duration: Int
  cost: Int!
  location: Address
  hostName: String
  link: String
  source: String!
  attended: Boolean!
  sequence: Int!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
