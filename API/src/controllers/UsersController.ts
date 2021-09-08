import { Upload } from 'graphql-upload'
import { UsersDetail } from '../dto/Users/UsersDetail'
import { UserInputError } from 'apollo-server-errors'
import { Users } from '../entity/Users'
import { ApolloError } from 'apollo-server-express'
import { UsersUpdate } from '../dto/Users/UsersUpdate'
import { UsersInput } from '../dto/Users/UsersInput'
import uploadS3 from '../helpers/S3/upload.S3'
import { Service } from 'typedi'

// precisa declarar a classe a ser injetada com o decorator @Service também
@Service()
export class UsersController {
    async createUser (data: UsersInput, avatar?: Upload): Promise<Users> {
        try {
            // @ts-ignore
            const user = await Users.create({
                ...data,
                avatar: avatar ? await uploadS3(avatar, 'avatar') : null
                // @ts-ignore
            }).save()
            user.password = 'secret'
            if (!user) {
                throw new ApolloError('Error creating user')
            }
            return user
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new UserInputError('E-mail already in use')
            } else {
                throw new ApolloError('Unable to create user')
            }
        }
    }

    async Users (): Promise<Users[]> {
        const user = await Users.find()
        return user
    }

    async getUser (data: UsersDetail): Promise<Users> {
        const user = await Users.findOne(data)
        if (!user) {
            throw new UserInputError('User not found')
        }
        return user
    }

    async deleteUser (data: UsersDetail): Promise<Boolean> {
        const user = await this.getUser(data)
        const deletedUser = await Users.delete({ id: user.id })
        if (!deletedUser) {
            throw new ApolloError('Error deleting user')
        }
        return true
    }

    async updateUser (
        id: String,
        data: UsersUpdate,
        avatar?: Upload
    ): Promise<Users> {
    // @ts-ignore
        const user = await this.getUser(id)
        try {
            await Users.update(
                { id: user.id },
                // @ts-ignore
                {
                    ...data,
                    avatar: avatar ? await uploadS3(avatar, 'avatar') : user.avatar
                }
            )
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new UserInputError('E-mail already in use')
            } else {
                throw new ApolloError('Unable to create user')
            }
        }

        // @ts-ignore
        return { ...user, ...data, password: 'secret' }
    }
}
