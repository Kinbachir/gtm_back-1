import { returnStatus } from "../../utils/ReturnStatus"

/**
 * @description get role list
 */
export const getSysDate = (req, res) => {
    returnStatus(res, 200, 1, new Date())
}
