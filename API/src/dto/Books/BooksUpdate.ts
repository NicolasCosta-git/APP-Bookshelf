import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class BooksUpdate {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    cover: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    synopsis: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    pages: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    language: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    dimensions: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    publicationDate: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    publisher: string;
}
