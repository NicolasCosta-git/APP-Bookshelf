import { hashSync } from 'bcrypt'

// to() ta transformando a senha em um hash antes de colocar no banco
export const hashPasswordTransform = {
    to (password: string): string {
        return hashSync(password, 12)
    },
    from (hash: string): string {
        return hash
    }
}
