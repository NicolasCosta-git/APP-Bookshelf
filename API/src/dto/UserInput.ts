import { IsEmail, IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
    @Field()
    @IsNotEmpty()
    name: String

    @Field()
    @IsEmail()
    email: String

    @Field()
    password: String

    @Field({ nullable: true })
    avatar: String
}
