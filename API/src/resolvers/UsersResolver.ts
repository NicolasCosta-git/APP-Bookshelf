/* eslint-disable no-useless-constructor */
import { UsersUpdate } from '../dto/Users/UsersUpdate'
import { UsersDetail } from '../dto/Users/UsersDetail'
import { UsersInput } from '../dto/Users/UsersInput'
import { Mutation, Query, Arg, Resolver, Authorized, Ctx } from 'type-graphql'
import { Users } from '../entity/Users'
import { UsersController } from '../controllers/UsersController'
import { GraphQLUpload, Upload } from 'graphql-upload'
import { Service } from 'typedi'

@Service()
@Resolver(Users)
export default class UsersResolver {
    // para injetar dependência, usei o decorator Service do pacote typedi de DI
    // e declarei a injection no constructor
    constructor (private readonly usersController: UsersController) {}

    // o middleware de autorização é aplicado nas rotas escolhidas com o @Authorized
    @Query(() => [Users])
    @Authorized()
    // da pra usar o @Ctx pra acessar o context
    async users (@Ctx() ctx: any): Promise<Users[]> {
        return await this.usersController.Users()
    }

    @Query(() => Users)
    async getUser (
        @Arg('data', () => UsersDetail) data: UsersDetail
    ): Promise<Users> {
        return await this.usersController.getUser(data)
    }

    @Mutation(() => Users)
    // para enviar arquivos pelo graphql, o input precisa ser do tipo graphqlupload com a variável do tipo upload
    async createUser (
        @Arg('data', () => UsersInput) data: UsersInput,
            @Arg('avatar', () => GraphQLUpload, { nullable: true }) avatar: Upload
    ): Promise<Users> {
        return await this.usersController.createUser(data, avatar)
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteUser (@Arg('id', () => String) id: String): Promise<Boolean> {
    // @ts-ignore
        return await this.usersController.deleteUser(id)
    }

    @Mutation(() => Users)
    @Authorized()
    async updateUser (
        @Arg('id', () => String) id: String,
            @Arg('data', () => UsersUpdate) data: UsersUpdate,
            @Arg('avatar', () => GraphQLUpload, { nullable: true }) avatar?: Upload
    ): Promise<Users> {
        return await this.usersController.updateUser(id, data, avatar)
    }
}
