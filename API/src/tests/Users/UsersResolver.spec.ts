import 'reflect-metadata'
import { connection } from './../connection'
import { createUser } from './Mocks'
import { buildApolloServer } from '../../apollo'
import { createConnection } from 'typeorm'
import {} from 'jest'

describe('UserResolver', () => {
    it('should create user', async () => {
        const mockserver = buildApolloServer()
        await mockserver.start()
        await createConnection({ ...connection })
        const result = mockserver.executeOperation({
            query: createUser
        })

        await mockserver.stop()
        await expect(result).toBeTruthy()
    })
})
