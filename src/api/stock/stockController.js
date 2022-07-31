import { returnStatus } from "../../utils/ReturnStatus"
import { stockNotification } from "../notification/notificationController"
import { createStock, findStockByStore, findStockByUser, findStockDays } from "./stockServices"

/**
 * @description get stock list by store
 */
export const getStockByStore = (req, res) => {
    const storeId = req.params.storeId
    const from = req.params.from

    findStockByStore(storeId, from)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description get stock list by user
 */
export const getStockByUser = (req, res) => {
    const userId = req.params.userId
    const from = req.params.from
    const to = req.params.to

    findStockByUser(userId, from, to)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * update store if the object contain an id otherwise it create a new one
 */
export const upsertStock = async (req, res) => {

    const stock = req.body
    stock.forEach(element => {
        createStock(element)
            .catch((err) => {
                returnStatus(res, 400, 0, undefined, err)
            })
    })
    await stockNotification(stock)
    returnStatus(res, 201, 1, undefined, "stock updated")
}

/**
 * @description get stock days visits
 */
export const getStockDays = (req, res) => {
    const storeId = req.params.storeId
    const days = req.params.days
    findStockDays(storeId, days)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}