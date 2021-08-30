import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    @IsNotEmpty()
    @IsString()
    id: String

    @Column()
    @Field()
    @IsNotEmpty()
    @IsString()
    name: String

    @Column()
    @Field()
    @IsNotEmpty()
    @IsString()
    email: String

    @Column()
    @Field()
    @IsNotEmpty()
    @IsString()
    password: String

    @Column({ nullable: true })
    @IsOptional()
    @Field()
    @IsString()
    avatar: String
}
