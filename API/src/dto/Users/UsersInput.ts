import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UsersInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: String

    @Field()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: String

    @Field()
    @IsString()
    @IsNotEmpty()
    password: String
}
