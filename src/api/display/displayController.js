import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"
import { createDisplayCustomFieldValue, removeDisplayCustomFieldValue } from "../displayCustomFieldValue/displayCustomFieldValueServices"
import { createDisplayData, removeDisplayData } from "../displayData/displayDataServices"
import { createDisplay, findDisplay, findDisplayByUser, removeDisplay } from "./displayServices"

/**
 * @description get Display list
 */
export const getDisplay = (req, res) => {
    findDisplay()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description get Display list by user between two dates
 */
 export const getDisplayByUser = (req, res) => {
     const userId = req.params.userId 
     const from = req.params.from 
     const to = req.params.to 
    findDisplayByUser(userId, from, to)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update display if the object contain an id otherwise it create a new one
 * @description upload displayData image and save object with image path
 */
export const upsertDisplay = (req, res) => {
    const display = JSON.parse(req.body.display)
    const displayData = JSON.parse(req.body.data)
    const customValues = JSON.parse(req.body.customValues)
    const files = req.files
    createDisplay(display).then((data) => {
        files?.forEach(async (e, index) => {
            createDisplayData({ ...displayData[index], path: await formatImage(e, req.protocol, "displayData"), displayId: (display.id || data.dataValues.id) })
        })
        customValues?.forEach((element) => {
            delete element.field
            createDisplayCustomFieldValue({ ...element, displayId: (display.id || data.dataValues.id) })
        })
        returnStatus(res, 201, 1)
    }).catch((error) => {
        res.send(error)
    })
}

/**
 * 
 * @description delete display by id
 */
export const deleteDisplay = (req, res) => {
    const displayId = req.params.displayId
    removeDisplayData(displayId).then(() => {
        removeDisplayCustomFieldValue(displayId).then(() => {
            removeDisplay(displayId).then(() => {
                returnStatus(res, 202, 1, undefined, "display deleted!")
            })
        })
    })

}