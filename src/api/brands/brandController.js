import { returnStatus } from "../../utils/ReturnStatus"
import { createBrand, findBrands } from "./brandServices"
import { formatImage } from "../../utils/upload"

/**
 * @description get brand list
 */
export const getBrands = (req, res) => {
    findBrands()
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
export const upsertBrand = async (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const brand = JSON.parse(req.body.brand)
        if (!brand.name) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            if (req.file) {
                brand.path = await formatImage(req.file, req.protocol, "brands")
            }
            createBrand(brand).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                if (error.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "brand name are already in use!")
                }
                else {
                    res.send(error)
                }
            })
        }
    }
}