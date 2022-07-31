import { DisplayCustomField } from '../../config/database'

/**
 * 
 * @returns DisplayCustomField list
 */
export const findDisplayCustomField = async () => {
    return DisplayCustomField.findAll();
}

/**
 * 
 * @param {DisplayCustomField} displayCustomField 
 * @description update DisplayCustomField if the object contain an id otherwise it create a new one
 */
export const createDisplayCustomField = async (displayCustomField) => {
    return DisplayCustomField.create(displayCustomField)
}