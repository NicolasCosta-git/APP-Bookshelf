import { OrdersResolver } from './resolvers/OdersResolver'
import { buildSchemaSync } from 'type-graphql'
import { AuthGuard } from './middleware/Auth/AuthGuard'
import { Container } from 'typedi'
import { ApolloServer } from 'apollo-server-express'
import AuthResolver from './resolvers/AuthResolver'
import BooksResolver from './resolvers/BooksResolver'
import UsersResolver from './resolvers/UsersResolver'

export function buildApolloServer (testToken?: string) {
    return new ApolloServer({
    // Para habilitar a injeção de dependência com o typedi, tem que declarar o container dentro de buildSchema
        schema: buildSchemaSync({
            resolvers: [UsersResolver, AuthResolver, BooksResolver, OrdersResolver],
            container: Container,
            authChecker: AuthGuard
        }),
        context: ({ req, res }) => ({
            // o que for declarado aqui sera retornado como context
            req,
            res,
            token: req?.headers?.authorization,
            testToken: testToken || null
        })
    })
}
