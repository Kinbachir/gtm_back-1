import { Order, OrderDetail, OrderPicture, Store, User, Product } from '../../config/database'

/**
 * 
 * @returns Order list
 */
export const findOrders = async () => {
    return Order.findAll(
        {
            include: [
                {
                    model: Store,
                },
                {
                    model: User,
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                        },
                    ]
                },
                {
                    model: OrderPicture,
                },
            ]
        }
    );
}

/**
 * 
 * @param {Order} order 
 * @description update order if the object contain an id otherwise it create a new one
 */
export const createOrder = async (order) => {
    if (order.id) {
        return Order.update(
            order,
            {
                where: {
                    id: order.id
                }
            }
        )
    } else {
        return Order.create(order)
    }
}