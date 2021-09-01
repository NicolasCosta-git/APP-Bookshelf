import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Books extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    author: string;

    @Field({ nullable: false })
    @Column({ nullable: false })
    cover: string;

    @Field()
    @Column()
    synopsis: string;

    @Field()
    @Column()
    pages: string;

    @Field()
    @Column()
    language: string;

    @Field()
    @Column()
    dimensions: string;

    @Field()
    @Column()
    publicationDate: string;

    @Field()
    @Column()
    publisher: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    createdAt: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    updatedAt: string;
}
