import { Upload } from 'graphql-upload'
import { UsersDetail } from '../dto/Users/UsersDetail'
import { UserInputError } from 'apollo-server-errors'
import { Users } from '../entity/Users'
import { ApolloError } from 'apollo-server-express'
import { UsersUpdate } from '../dto/Users/UsersUpdate'
import { UsersInput } from '../dto/Users/UsersInput'
import saveAvatar from '../helpers/avatar/avatar.save'

export class UsersController {
    static async createUser (data: UsersInput, upload?: Upload): Promise<Users> {
        if (upload) {
            data.avatar = (await saveAvatar(upload)).uri.Location
        } else {
            data.avatar = ''
        }
        // @ts-ignore
        const user = await Users.create({ ...data }).save()
        if (!user) {
            throw new ApolloError('Error creating user')
        }
        return user
    }

    static async Users (): Promise<Users[]> {
        const user = await Users.find()
        return user
    }

    static async getUser (data: UsersDetail): Promise<Users> {
        const user = await Users.findOne(data)
        if (!user) {
            throw new UserInputError('User not found')
        }
        return user
    }

    static async deleteUser (data: UsersDetail): Promise<Boolean> {
        const user = await this.getUser(data)
        const deletedUser = await Users.delete(user)
        if (!deletedUser) {
            throw new ApolloError('Error deleting user')
        }
        return true
    }

    static async updateUser (id: String, data: UsersUpdate, upload: Upload): Promise<Users> {
        if (upload) {
            data.avatar = (await saveAvatar(upload)).uri.Location
        }
        // @ts-ignore
        const user = await this.getUser(id)
        console.log(user)
        await Users.update(user, { ...data })
        // @ts-ignore
        return { ...user, ...data }
    }
}
