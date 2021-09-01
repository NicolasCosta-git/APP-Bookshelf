import { BooksUpdate } from './../dto/Books/BooksUpdate'
import { BooksDetail, BooksDetails } from './../dto/Books/BooksDetail'
import { BooksController } from './../controllers/BooksController'
import { BooksInput } from './../dto/Books/BooksInput'
import { Books } from './../entity/Books'
import { Mutation, Arg, Resolver, Query } from 'type-graphql'
import { GraphQLUpload, Upload } from 'graphql-upload'

@Resolver(Books)
export default class BooksResolver {
    @Query(() => [Books])
    async books (): Promise<Books[]> {
        return await BooksController.getBooks()
    }

    @Query(() => Books)
    async getBook (
        @Arg('data', () => BooksDetail) data: BooksDetail
    ): Promise<Books> {
        return await BooksController.getBook(data)
    }

    @Query(() => [Books])
    async getBooks (
        @Arg('data', () => BooksDetails) data: BooksDetails
    ): Promise<Books[]> {
        return await BooksController.getBooksBy(data)
    }

    @Mutation(() => Books)
    async createBook (
        @Arg('data', () => BooksInput) data: BooksInput,
            @Arg('cover', () => GraphQLUpload) cover: Upload
    ): Promise<Books> {
        return await BooksController.createBook(data, cover)
    }

    @Mutation(() => Boolean)
    async deleteBook (@Arg('id', () => String) id: string): Promise<Boolean> {
        return await BooksController.deleteBook(id)
    }

    @Mutation(() => Books)
    async updateBook (
        @Arg('id', () => String) id: string,
            @Arg('data', () => BooksUpdate) data: BooksUpdate,
            @Arg('cover', () => GraphQLUpload)cover: Upload
    ): Promise<Books> {
        return await BooksController.updateBook(id, data, cover)
    }
}
