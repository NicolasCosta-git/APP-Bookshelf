import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class OrdersInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    status: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    price: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    quantity: string;
}
