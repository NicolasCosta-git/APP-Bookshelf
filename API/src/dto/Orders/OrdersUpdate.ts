import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class OrdersUpdate {
    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    price: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    quantity: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    user: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    book: string;

    @Field({ nullable: true })
    @IsString()
    @IsNotEmpty()
    status: string;
}
