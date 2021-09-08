import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Books extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    @Field(() => ID)
    id: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    author: string;

    // nullable false
    @Field({ nullable: true })
    @Column({ nullable: true })
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
    price: string;

    @Field()
    @Column()
    publicationDate: string;

    @Field()
    @Column()
    publisher: string;

    @CreateDateColumn({ name: 'createdAt' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    @Field()
    updatedAt: Date;
}
