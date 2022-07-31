import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"
import { createStoreGroup, findStoreGroup } from "./storeGroupServices"

/**
 * @description get brand list
 */
export const getStoreGroup = (req, res) => {
    findStoreGroup()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update brand if the object contain an id otherwise it create a new one
 */
export const upsertStoreGroup = async (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const storeGroup = JSON.parse(req.body.storeGroup)
        if (!storeGroup.id && !storeGroup.name) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            if (req.file) {
                storeGroup.path = await formatImage(req.file, req.protocol, "storeGroups")
            }
            createStoreGroup(storeGroup).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                if (error.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "storeGroup name are already in use!")
                }
                else {
                    res.send(error)
                }
            })
        }
    }
}