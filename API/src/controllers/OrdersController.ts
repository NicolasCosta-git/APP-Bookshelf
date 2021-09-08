import { OrdersUpdate } from './../dto/Orders/OrdersUpdate'
import { UserInputError } from 'apollo-server-errors'
import { Orders } from './../entity/Orders'
import { ApolloError } from 'apollo-server-express'
import { OrdersInput } from './../dto/Orders/OrdersInput'
import { Service } from 'typedi'

@Service()
export class OrdersController {
    async createOrder (data: OrdersInput): Promise<Orders> {
        const order = await Orders.create({
            ...data,
            // @ts-ignore
            user: data.userId,
            book: data.bookId
            // @ts-ignore
        }).save()
        // da pra fazer query com relações assim, um array com o nome da variável que recebe as relações na entity
        const orderData = await Orders.findOne({
            where: { id: order.id },
            relations: ['user', 'book']
        })
        if (!order || !orderData) {
            throw new ApolloError('Unable to create order')
        }
        return orderData
    }

    async getOrders (): Promise<Orders[]> {
        const orders = await Orders.find()
        if (!orders) {
            throw new ApolloError('Unable to retrieve orders')
        }
        return orders
    }

    async getOrder (id: string): Promise<Orders> {
        const order = await Orders.findOne({ id })
        if (!order) {
            throw new UserInputError('Unable to find order')
        }
        return order
    }

    async updateOrder (id: string, data: OrdersUpdate): Promise<Orders> {
        const order = await this.getOrder(id)
        // @ts-ignore
        await Orders.update({ id: order.id }, { ...data })

        return this.getOrder(order.id)
    }

    async deleteOrder (id: string): Promise<Boolean> {
        const order = await this.getOrder(id)
        const deletedOrder = await Orders.delete({ id: order.id })
        if (!deletedOrder) {
            throw new ApolloError('Unable to delete order')
        }
        return true
    }
}
