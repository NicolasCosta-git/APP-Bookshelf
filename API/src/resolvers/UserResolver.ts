import { UserInput } from './../dto/UserInput'
import { Mutation, Query, Arg, Resolver } from 'type-graphql'

@Resolver()
export default class UserResolver {
    @Query(() => Boolean)
    Users () {
        return true
    }

    @Mutation(() => Boolean)
    async createUser (@Arg('data', () => UserInput) data: UserInput) {
        return data
    }
}
