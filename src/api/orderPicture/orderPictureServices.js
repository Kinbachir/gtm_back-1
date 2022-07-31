import { OrderPicture } from '../../config/database'

/**
 * 
 * @param {OrderPicture} orderPicture 
 * @description update OrderPicture if the object contain an id otherwise it create a new one
 */
export const createOrderPicture = async (orderPicture) => {
    return OrderPicture.create(orderPicture)
}