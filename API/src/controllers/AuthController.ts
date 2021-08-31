import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { ValidationError } from 'apollo-server-express'
import { Users } from './../entity/Users'
import { AuthObject } from '../middleware/Auth/AuthObject'
import { AuthInput } from './../middleware/Auth/AuthInput'

require('dotenv').config()

export default class AuthController {
    static async authenticate (data: AuthInput): Promise<AuthObject> {
        const user = await Users.findOne({ email: data.email })
        if (!user) {
            throw new ValidationError('Wrong email/password combination')
        }

        const passwordMatched = await compare(data.password, user.password)

        if (!passwordMatched) {
            throw new ValidationError('Wrong email/password combination')
        }

        const { JWT_TOKEN: secret, JTW_EXPIRATION: expiresIn } = process.env
        const token = sign({}, secret, { subject: user.id.toString(), expiresIn })

        return { token, users: user }
    }
}
