import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UsersUpdate {
    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @Field({ nullable: true })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: string;
}
