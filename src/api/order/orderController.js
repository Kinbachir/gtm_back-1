import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"
import { createOrderDetail } from "../orderDetail/orderDetailServices"
import { createOrderPicture } from "../orderPicture/orderPictureServices"
import { createOrder, findOrders } from "./orderServices"

/**
 * @description get order list
 */
export const getOrders = (req, res) => {
    findOrders()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update order if the object contain an id otherwise it create a new one
 */
export const upsertOrder = async (req, res) => {
    const order = JSON.parse(req.body.order)
    const orderDetail = JSON.parse(req.body.orderDetail)
    const files = req.files
    if (!order.date || !order.amount) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        order.code = "CMD-" + Date.now()
        createOrder(order).then((data) => {
            orderDetail.forEach((element) => {
                createOrderDetail({ ...element, orderId: data.dataValues.id })
            });
            files?.forEach(async (e) => {
                createOrderPicture({ path: await formatImage(e, req.protocol, "orders"), orderId: (data.dataValues.id) })
            })
            returnStatus(res, 201, 1)
        }).catch((error) => {
            res.send(error)
        })
    }
}
