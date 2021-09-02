/* eslint-disable no-useless-constructor */
import { BooksUpdate } from './../dto/Books/BooksUpdate'
import { BooksDetail, BooksDetails } from './../dto/Books/BooksDetail'
import { BooksController } from './../controllers/BooksController'
import { BooksInput } from './../dto/Books/BooksInput'
import { Books } from './../entity/Books'
import { Mutation, Arg, Resolver, Query, Authorized } from 'type-graphql'
import { GraphQLUpload, Upload } from 'graphql-upload'
import { Service } from 'typedi'

@Resolver(Books)
@Service()
export default class BooksResolver {
    constructor (private readonly booksController: BooksController) {}

    @Query(() => [Books])
    async books (): Promise<Books[]> {
        return await this.booksController.getBooks()
    }

    @Query(() => Books)
    async getBook (
        @Arg('data', () => BooksDetail) data: BooksDetail
    ): Promise<Books> {
        return await this.booksController.getBook(data)
    }

    @Query(() => [Books])
    async getBooks (
        @Arg('data', () => BooksDetails) data: BooksDetails
    ): Promise<Books[]> {
        return await this.booksController.getBooksBy(data)
    }

    @Mutation(() => Books)
    @Authorized()
    async createBook (
        @Arg('data', () => BooksInput) data: BooksInput,
            @Arg('cover', () => GraphQLUpload) cover: Upload
    ): Promise<Books> {
        return await this.booksController.createBook(data, cover)
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteBook (@Arg('id', () => String) id: string): Promise<Boolean> {
        return await this.booksController.deleteBook(id)
    }

    @Mutation(() => Books)
    @Authorized()
    async updateBook (
        @Arg('id', () => String) id: string,
            @Arg('data', () => BooksUpdate) data: BooksUpdate,
            @Arg('cover', () => GraphQLUpload, { nullable: true }) cover?: Upload
    ): Promise<Books> {
        return await this.booksController.updateBook(id, data, cover)
    }
}
