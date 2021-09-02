import { Upload } from 'graphql-upload'
import { BooksUpdate } from './../dto/Books/BooksUpdate'
import { BooksDetail } from './../dto/Books/BooksDetail'
import { UserInputError } from 'apollo-server-errors'
import { ApolloError } from 'apollo-server-express'
import { Books } from './../entity/Books'
import { BooksInput } from './../dto/Books/BooksInput'
import { BooksDetails } from '../dto/Books/BooksDetail'
import uploadS3 from '../helpers/S3/upload.S3'
import { Service } from 'typedi'

@Service()
export class BooksController {
    async createBook (data: BooksInput, cover?: Upload): Promise<Books> {
        const book = await Books.create({
            ...data,
            cover: cover ? await uploadS3(cover, 'book') : null,
            createdAt: Date().split(' ').splice(0, 6).join(' ')
        }).save()
        if (!book) {
            throw new ApolloError('Unable to create book')
        }
        return book
    }

    async getBooks (): Promise<Books[]> {
        const books = await Books.find()
        if (!books) {
            throw new ApolloError('Unable to retrieve books')
        }
        return books
    }

    async getBook (data: BooksDetail): Promise<Books> {
        const book = await Books.findOne({ id: data.id })
        if (!book) {
            throw new UserInputError('Unable to find book')
        }
        return book
    }

    async getBooksBy (data: BooksDetails): Promise<Books[]> {
        const books = await Books.find({ ...data })
        if (!books) {
            throw new UserInputError('Unable to find books')
        }
        return books
    }

    async deleteBook (id: string): Promise<Boolean> {
        const book = await this.getBook({ id })
        const deletedBook = await Books.delete({ id: book.id })
        if (!deletedBook) {
            throw new ApolloError('Error deleting book')
        }
        return true
    }

    async updateBook (
        id: string,
        data: BooksUpdate,
        cover?: Upload
    ): Promise<Books> {
        const book = await this.getBook({ id })
        await Books.update(
            { id: book.id },
            {
                ...data,
                cover: cover ? await uploadS3(cover, 'book') : null,
                updatedAt: Date().split(' ').splice(0, 6).join(' ')
            }
        )
        // @ts-ignore
        return { ...book, ...data }
    }
}
