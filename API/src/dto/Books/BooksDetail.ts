import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class BooksDetail {
    @Field()
    @IsString()
    @IsNotEmpty()
    id: string;
}

@InputType()
export class BooksDetails {
    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    author: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    title: string;
}
