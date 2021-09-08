import { OrdersUpdate } from './../dto/Orders/OrdersUpdate'
/* eslint-disable no-useless-constructor */
import { OrdersInput } from './../dto/Orders/OrdersInput'
import { OrdersController } from './../controllers/OrdersController'
import { Orders } from './../entity/Orders'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

@Resolver(Orders)
@Service()
export class OrdersResolver {
    constructor (private readonly ordersController: OrdersController) {}

    @Query(() => [Orders])
    async orders (): Promise<Orders[]> {
        return await this.ordersController.getOrders()
    }

    @Query(() => Orders)
    async getOrder (@Arg('id', () => String) id: string): Promise<Orders> {
        return await this.ordersController.getOrder(id)
    }

    @Mutation(() => Orders)
    async createOrder (
        @Arg('data', () => OrdersInput) data: OrdersInput
    ): Promise<Orders> {
        return await this.ordersController.createOrder(data)
    }

    @Mutation(() => Orders)
    async updateOrder (
        @Arg('id', () => String) id: string,
            @Arg('data', () => OrdersUpdate) data: OrdersUpdate
    ): Promise<Orders> {
        return await this.ordersController.updateOrder(id, data)
    }

    @Mutation(() => Boolean)
    async deleteOrder (@Arg('id', () => String) id: string): Promise<Boolean> {
        return await this.ordersController.deleteOrder(id)
    }
}
