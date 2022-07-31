import { returnStatus } from "../../utils/ReturnStatus"
import { createFamily, findFamilies } from "./familyServices"

/**
 * @description get family list
 */
export const getFamilies = (req, res) => {
    findFamilies()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update family if the object contain an id otherwise it create a new one
 */
export const upsertFamily = (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const family = req.body
        if (!family.id && !family.name) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            createFamily(family).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                if (error.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "family name are already in use!")
                }
                else {
                    res.send(error)
                }
            })
        }
    }
}