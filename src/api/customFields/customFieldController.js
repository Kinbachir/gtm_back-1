import { returnStatus } from "../../utils/ReturnStatus"
import { createCustomField, findCustomFields } from "./customFieldServices"

/**
 * @description get customField list
 */
export const getCustomFields = (req, res) => {
    const entity = req.params.entity

    findCustomFields(entity)
        .then((data) => {
            if (data.length > 0) {
                returnStatus(res, 200, 1, data)

            } else {
                returnStatus(res, 400, 0, undefined, "no data available!")
            }
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update customField if the object contain an id otherwise it create a new one
 */
export const upsertCustomField = (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const customField = req.body
        if (!customField.name || !customField.table_name || !customField.type) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            createCustomField(customField).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                if (error.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "customField name are already in use!")
                }
                else {
                    res.send(error)
                }
            })
        }
    }
}