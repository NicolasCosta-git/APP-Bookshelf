import { UsersUpdate } from '../dto/Users/UsersUpdate'
import { UsersDetail } from '../dto/Users/UsersDetail'
import { UsersInput } from '../dto/Users/UsersInput'
import { Mutation, Query, Arg, Resolver, Authorized } from 'type-graphql'
import { Users } from '../entity/Users'
import { UsersController } from '../controllers/UsersController'
import { GraphQLUpload, Upload } from 'graphql-upload'

@Resolver(Users)
export default class UsersResolver {
    @Query(() => [Users])
    @Authorized()
    async Users (): Promise<Users[]> {
        return await UsersController.Users()
    }

    @Query(() => Users)
    async getUser (
        @Arg('data', () => UsersDetail) data: UsersDetail
    ): Promise<Users> {
        return await UsersController.getUser(data)
    }

    @Mutation(() => Users)
    async createUser (
        @Arg('data', () => UsersInput) data: UsersInput,
            @Arg('file', () => GraphQLUpload, { nullable: true }) file: Upload
    ): Promise<Users> {
        return await UsersController.createUser(data, file)
    }

    @Mutation(() => Boolean)
    async deleteUser (@Arg('id', () => String) id: String): Promise<Boolean> {
    // @ts-ignore
        return await UsersController.deleteUser(id)
    }

    @Mutation(() => Users)
    async updateUser (
        @Arg('id', () => String) id: String,
            @Arg('data', () => UsersUpdate) data: UsersUpdate,
            @Arg('file', () => GraphQLUpload, { nullable: true }) file: Upload
    ): Promise<Users> {
        return await UsersController.updateUser(id, data, file)
    }
}
