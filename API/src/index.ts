import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import express from 'express'
import { testResolver } from './resolvers/testResolver'
import UserResolver from './resolvers/UserResolver'

require('dotenv').config()

const PORT = process.env.PORT

const server = async () => {
    const app = express()
    await createConnection()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [testResolver, UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: true })
    app.listen(PORT, () => {
        console.log(`Server on at http://localhost:${PORT}/graphql`)
    })
}

server()
