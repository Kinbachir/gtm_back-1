import { returnStatus } from "../../utils/ReturnStatus"
import { createCategory, findCategories, findCategoriesByFamily } from "./categoryServices"

/**
 * @description get category list
 */
export const getCategories = (req, res) => {
    findCategories()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description get category list by family
 */
export const getCategoriesByFamily = (req, res) => {
    const familyId = req.params.familyId
    findCategoriesByFamily(familyId)
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
 * @description update category if the object contain an id otherwise it create a new one
 */
export const upsertCategory = (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const category = req.body
        if (!category.id && !category.name) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            createCategory(category).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                if (error.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "category name are already in use!")
                }
                else {
                    res.send(error)
                }
            })
        }
    }
}