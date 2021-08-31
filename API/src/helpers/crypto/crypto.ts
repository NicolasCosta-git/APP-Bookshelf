import { hashSync } from 'bcrypt'

export const hashPasswordTransform = {
    to (password: String): String {
        return hashSync(password, 12)
    },
    from (hash: String): String {
        return hash
    }
}
