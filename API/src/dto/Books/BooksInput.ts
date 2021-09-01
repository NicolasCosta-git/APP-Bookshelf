import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class BooksInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    author: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    cover: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    synopsis: string;

    @Field()
    @IsNotEmpty()
    pages: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    language: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    dimensions: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    publicationDate: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    publisher: string;
}
