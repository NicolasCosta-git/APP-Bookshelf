import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import express from 'express'
import { testResolver } from './resolvers/testResolver'
import UserResolver from './resolvers/UsersResolver'
import { graphqlUploadExpress } from 'graphql-upload'
const morgan = require('morgan')

require('dotenv').config()

const PORT = process.env.PORT

const server = async () => {
    try {
        await createConnection()
    } catch (error) {
        console.log(error)
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [testResolver, UserResolver]
        }),
        context: ({ req, res }) => ({ req, res }),
        introspection: true
    })
    await apolloServer.start()

    const app = express()
    app.use(graphqlUploadExpress({ maxFieldSize: 1000000000000000, maxFiles: 10 }))
    app.use(morgan('dev'))
    apolloServer.applyMiddleware({ app, cors: true })
    app.listen(PORT, () => {
        console.log(`Server on at http://localhost:${PORT}/graphql`)
    })
}

server()
