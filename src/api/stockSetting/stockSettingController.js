import { returnStatus } from "../../utils/ReturnStatus"
import { createStockSetting, findStockSetting } from "./stockSettingServices"

/**
 * @description get StockSetting list by store
 */
export const getStockSetting = (req, res) => {
    findStockSetting()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * update StockSetting if the object contain an id otherwise it create a new one
 */
export const upsertStockSetting = async (req, res) => {
    const stockSetting = req.body
    if (!stockSetting.days || !stockSetting.stockManagement) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        createStockSetting(stockSetting).then(() => {
            returnStatus(res, 201, 1, "stock setting updated")
        })
    }
}