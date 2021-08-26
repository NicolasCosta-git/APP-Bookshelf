import { Query, Resolver } from 'type-graphql'

@Resolver()
export class testResolver {
    @Query(() => String)
    hello () {
        return 'teste'
    }
}
