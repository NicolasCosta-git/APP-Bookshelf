import { ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @Column()
    email: String

    @Column()
    password: String

    @Column({ nullable: true })
    avatar: String
}
