import { AuthChecker } from 'type-graphql'
import { verify } from 'jsonwebtoken'

require('dotenv').config()

interface Context {
    token?: string;
    testToken?: string
}

export const AuthGuard: AuthChecker<Context> = ({ context }): boolean => {
    const authHeader = context.testToken || context.token

    if (!authHeader) {
        return false
    }
    const [, authtoken] = authHeader.split(' ')

    try {
        const { JWT_TOKEN: token } = process.env
        const decoded = verify(authtoken, token)
        return !!decoded
    } catch {
        return false
    }
}
