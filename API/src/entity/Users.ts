import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hashPasswordTransform } from '../helpers/crypto/crypto'

@Entity()
@ObjectType()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ transformer: hashPasswordTransform })
    @Field()
    password: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    createdAt: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt: string;
}
