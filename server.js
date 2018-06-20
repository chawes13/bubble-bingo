const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const schema = require('./server/graphql/schema')

// this will allow the create-react-app instance to talk to the localhost graphql
const cors = require('cors')

const GRAPHQL_PORT = 4000;

const graphQLServer = express()

graphQLServer.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
)
