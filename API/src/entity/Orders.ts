import { Books } from './Books'
import { Users } from './Users'
import { Field, ID, ObjectType } from 'type-graphql'
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm'
import { Service } from 'typedi'

@Entity()
@Service()
@ObjectType()
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    price: string;

    @Column()
    @Field()
    quantity: string;

    @ManyToOne((type) => Users, (user) => user.id, {
        onDelete: 'CASCADE',
        eager: true,
        primary: false,
        nullable: false
    })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @Field()
    user: Users;

    @ManyToOne((type) => Books, (book) => book.id, {
        onDelete: 'CASCADE',
        eager: true,
        primary: false,
        nullable: false
    })
    @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
    @Field()
    book: Books;

    @Column()
    @Field()
    status: string;

    @CreateDateColumn({ name: 'createdAt' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    @Field()
    updatedAt: Date;
}
