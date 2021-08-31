import { Users } from '../../entity/Users'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AuthObject {
    @Field({ nullable: false })
    token: String

    @Field({ nullable: false })
    users: Users
}
