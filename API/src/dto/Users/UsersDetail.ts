import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UsersDetail {
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    id?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email?: string;
}
