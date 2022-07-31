import { returnStatus } from "../../utils/ReturnStatus"
import { findPermissions, createPermission } from "./permissionServices"

/**
 * @description get permission list
 */
export const getPermissions = (req, res) => {
    const roleId = req.params.roleId
    findPermissions(roleId)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update permission if the object contain an id otherwise it create a new one
 */
export const upsertPermission = (req, res) => {
    const permission = req.body
    if (!permission.id && !permission.module) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        createPermission(permission).then(() => {
            returnStatus(res, 201, 1)
        }).catch((error) => {
            if (error.name = "SequelizeUniqueConstraintError") {
                returnStatus(res, 400, 0, undefined, "permission entity are already in use!")
            }
            else {
                res.send(err)
            }
        })
    }
}
