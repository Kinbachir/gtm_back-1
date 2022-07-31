import { returnStatus } from "../../utils/ReturnStatus"
import { createRole, findRoles } from "./roleServices"

/**
 * @description get role list
 */
export const getRoles = (req, res) => {
    findRoles()
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
 * @description update role if the object contain an id otherwise it create a new one
 */
export const upsertRole = (req, res) => {
    const role = req.body
    if (!role.id && !role.name) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        createRole(role).then(() => {
            returnStatus(res, 201, 1)
        }).catch((error) => {
            if (error.name = "SequelizeUniqueConstraintError") {
                returnStatus(res, 400, 0, undefined, "role name are already in use!")
            }
            else {
                res.send(err)
            }
        })
    }
}
