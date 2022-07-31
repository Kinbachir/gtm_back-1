import { DisplayCustomFieldValue } from '../../config/database'

/**
 * 
 * @returns DisplayCustomFieldValue list
 */
export const findDisplayCustomFieldValue = async () => {
    return DisplayCustomFieldValue.findAll();
}

/**
 * 
 * @param {DisplayCustomFieldValue} displayCustomField 
 * @description update DisplayCustomFieldValue if the object contain an id otherwise it create a new one
 */
export const createDisplayCustomFieldValue = async (displayCustomFieldValue) => {
    if (displayCustomFieldValue.id) {
        return DisplayCustomFieldValue.update(
            displayCustomFieldValue,
            {
                where: {
                    id: displayCustomFieldValue.id
                }
            }
        )
    } else {
        return DisplayCustomFieldValue.create(displayCustomFieldValue)
    }
}

/**
 * 
 * @param {Integer} displayId
 * @description delete DisplayCustomFieldValue where displayId = displayId
 */
export const removeDisplayCustomFieldValue = async (displayId) => {
    DisplayCustomFieldValue.destroy({
        where: { displayId: displayId }
    })
}