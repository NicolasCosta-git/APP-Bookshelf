import { buildSchemaSync } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import express from 'express'
import UserResolver from './resolvers/UsersResolver'
import { graphqlUploadExpress } from 'graphql-upload'
import AuthResolver from './resolvers/AuthResolver'
import { AuthGuard } from './middleware/Auth/AuthGuard'

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
        schema: await buildSchemaSync({
            resolvers: [UserResolver, AuthResolver],
            authChecker: AuthGuard
        }),
        context: ({ req, res }) => {
            const context = {
                req,
                token: req?.headers?.authorization
            }
            return context
        }
    })

    await apolloServer.start()

    const app = express()
    app.use(
        graphqlUploadExpress({ maxFieldSize: 1000000000000000, maxFiles: 10 })
    )

    app.use(morgan('dev'))

    apolloServer.applyMiddleware({ app, cors: true })

    app.listen(PORT, () => {
        console.log(`Server on at http://localhost:${PORT}/graphql`)
    })
}

server()
