import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID
} from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UsersUpdate {
    @Field({ nullable: true })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id?: String;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    name?: String;

    @Field({ nullable: true })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email?: String;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: String;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    avatar?: String;
}
