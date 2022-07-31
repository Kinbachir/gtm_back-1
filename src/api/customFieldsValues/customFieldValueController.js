import { returnStatus } from "../../utils/ReturnStatus"
import { findCustomFieldValues } from "./customFieldValueServices"

/**
 * @description get customFieldValue list
 */
export const getCustomFieldValues = (req, res) => {
    const storeId = req.params.storeId
    findCustomFieldValues(storeId)
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
