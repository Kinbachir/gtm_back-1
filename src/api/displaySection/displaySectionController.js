import { returnStatus } from "../../utils/ReturnStatus"
import { createDisplaySection, findDisplaySectionsBydisplayType } from "./displaySectionServices"
import { createDisplayCustomField } from "../displayCustomField/displayCustomFieldServices"

/**
 * @description get DisplaySection list By displayType
 */
export const getDisplaySectionsBydisplayType = (req, res) => {
    const displayTypeId = req.params.displayTypeId
    findDisplaySectionsBydisplayType(displayTypeId)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description update DisplaySection if the object contain an id otherwise it create a new one
 */
export const upsertDisplaySection = (req, res) => {
    const displaySection = req.body.displaySection
    const customFields = req.body.customFields
    if (!displaySection.name) {
        returnStatus(res, 400, 0, undefined, "missing required fields!")
    } else {
        createDisplaySection(displaySection).then((data) => {
            if (customFields.length > 0) {
                customFields.forEach((field) => {
                    createDisplayCustomField({ ...field, displaySectionId: data.dataValues.id })
                });
            }
            returnStatus(res, 201, 1)
        }).catch((error) => {
            if (error.name = "SequelizeUniqueConstraintError") {
                returnStatus(res, 400, 0, undefined, "DisplaySection name are already in use!")
            }
            else {
                res.send(error)
            }
        })
    }
}