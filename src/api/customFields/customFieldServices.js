import { CustomField } from '../../config/database'

/**
 * 
 * @returns customField list
 */
export const findCustomFields = async (entity) => {
    return CustomField.findAll({
        where: {
            table_name: entity
        },
    });
}

/**
 * 
 * @param {CustomField} customField 
 * @description update customField if the object contain an id otherwise it create a new one
 */
export const createCustomField = async (customField) => {
    if (customField.id) {
        return CustomField.update(
            customField,
            {
                where: {
                    id: customField.id
                }
            }
        )
    } else {
        return CustomField.create(customField)
    }
}