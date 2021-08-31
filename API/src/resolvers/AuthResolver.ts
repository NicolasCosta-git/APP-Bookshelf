import { AuthInput } from './../middleware/Auth/AuthInput'
import { Mutation, Arg, Resolver } from 'type-graphql'
import { AuthObject } from '../middleware/Auth/AuthObject'
import AuthController from '../controllers/AuthController'

@Resolver(AuthObject)
export default class AuthResolver {
    @Mutation(() => AuthObject)
    async signIn (@Arg('data', () => AuthInput) data: AuthInput): Promise<AuthObject> {
        return AuthController.authenticate(data)
    }
}
