/* eslint-disable no-useless-constructor */
import { AuthInput } from './../middleware/Auth/AuthInput'
import { Mutation, Arg, Resolver } from 'type-graphql'
import { AuthObject } from '../middleware/Auth/AuthObject'
import AuthController from '../controllers/AuthController'
import { Service } from 'typedi'

@Resolver(AuthObject)
@Service()
export default class AuthResolver {
    constructor (private readonly authController: AuthController) {}

    @Mutation(() => AuthObject)
    async signIn (@Arg('data', () => AuthInput) data: AuthInput): Promise<AuthObject> {
        return this.authController.authenticate(data)
    }
}
