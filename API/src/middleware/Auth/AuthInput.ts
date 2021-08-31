import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'
@InputType()
export class AuthInput {
    @Field({ nullable: false })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @Field({ nullable: false })
    @IsNotEmpty()
    @IsString()
    password: string
}
