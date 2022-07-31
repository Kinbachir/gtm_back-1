import { returnStatus } from "../../utils/ReturnStatus"
import { createDisplayType, findDisplayTypes } from "./displayTypeServices"

/**
 * @description get DisplayType list
 */
export const getDisplayTypes = (req, res) => {
    findDisplayTypes()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update displayType if the object contain an id otherwise it create a new one
 */
export const upsertDisplayType = (req, res) => {
    const displayType = req.body
    if (!displayType.name || !displayType.abbreviation) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        createDisplayType(displayType).then(() => {
            returnStatus(res, 201, 1)
        }).catch((error) => {
            if (error.name = "SequelizeUniqueConstraintError") {
                returnStatus(res, 400, 0, undefined, "displayType name and abbreviation must be unique!")
            }
            else {
                res.send(error)
            }
        })
    }
}