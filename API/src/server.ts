import { graphqlUploadExpress } from 'graphql-upload'
import { createConnection } from 'typeorm'
import { buildApolloServer } from './apollo'
import express from 'express'

const morgan = require('morgan')

require('dotenv').config()

const PORT = process.env.PORT

async function serverSetup () {
    try {
        await createConnection()
    } catch (error) {
        console.log(error)
    }
    const apolloServer = await buildApolloServer()

    await apolloServer.start()

    const app = express()
    app.use(
        graphqlUploadExpress({ maxFieldSize: 1000000000000000, maxFiles: 10 })
    )

    app.use(morgan('dev'))

    apolloServer.applyMiddleware({ app, cors: true })

    app.listen({ port: PORT }, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`)
    })
}

export const server = {
    start: async () => { await serverSetup() }
}
