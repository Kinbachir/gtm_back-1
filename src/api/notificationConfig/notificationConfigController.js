import Product from "../../models/Product"
import { returnStatus } from "../../utils/ReturnStatus"
import { getPlannedNotif } from "../notification/notificationController"
import { createNotificationConfig, createNotificationReferencing, findNotificationConfigs, findNotificationConfigsByType } from "./notificationConfigServices"

/**
 * @description get NotificationConfig list
 */
export const getNotificationConfigs = (req, res) => {
    findNotificationConfigs()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description get NotificationConfig list by type
 */
export const getNotificationConfigsByType = (req, res) => {

    const type = req.params.type

    findNotificationConfigsByType(type)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update NotificationConfig if the object contain an id otherwise it create a new one
 */
export const upsertNotificationConfig = (req, res) => {
    const notificationConfig = req.body
    if (notificationConfig.type === "Pointage" && (!notificationConfig.pointage_type || !notificationConfig.pointage_time)) {
        returnStatus(res, 400, 0, undefined, "L'heure de pointage est obligatoire!")
    } else {
        if (notificationConfig.type === "StockOut") {
            notificationConfig.pointage_type = null
            notificationConfig.pointage_time = null
        }
        createNotificationConfig(notificationConfig)
            .then((data) => {
                if (notificationConfig.type === "Pointage") {
                    notificationConfig?.selectedUsers?.forEach(user => {
                        notificationConfig?.selectedStores?.forEach(store => {
                            createNotificationReferencing({ storeId: store, userId: user, notificationConfigId: data.dataValues.id })
                        })
                    })
                } else if (notificationConfig.type === "StockOut") {
                    notificationConfig?.selectedProducts?.forEach(product => {
                        notificationConfig?.selectedStores?.forEach(store => {
                            createNotificationReferencing({ storeId: store, productId: product, notificationConfigId: data.dataValues.id })
                        })
                    })
                }
                setTimeout(() => {
                    getPlannedNotif()
                }, 1000);
                returnStatus(res, 201, 1)
            }).catch((error) => {
                returnStatus(res, 400, 0, undefined, error)
            })
    }
}