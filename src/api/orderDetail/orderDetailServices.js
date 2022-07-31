import { OrderDetail } from '../../config/database'

/**
 * 
 * @param {OrderDetail} orderDetail 
 * @description update orderDetail if the object contain an id otherwise it create a new one
 */
export const createOrderDetail = async (orderDetail) => {
    return OrderDetail.create(orderDetail)
}