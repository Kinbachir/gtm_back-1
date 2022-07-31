import { CustomField, CustomFieldValue } from '../../config/database'

/**
 * 
 * @returns customFieldValue list
 */
export const findCustomFieldValues = async (storeId) => {
    return CustomFieldValue.findAll({
        include: [
            {
                model: CustomField,
                as: 'customField'
            },
        ],
        where: {
            storeId: storeId
        },
    });
}

/**
 * 
 * @param {CustomFieldValue} customFieldValue 
 * @description update customFieldValue if the object contain an id otherwise it create a new one
 */
export const createCustomFieldValue = async (customFieldValue) => {
    try {
        if (customFieldValue.id) {
            return CustomFieldValue.update(
                customFieldValue,
                {
                    where: {
                        storeId: customFieldValue.storeId,
                        customFieldId: customFieldValue.customFieldId
                    }
                }
            )
        } else {
            return CustomFieldValue.create(customFieldValue)
        }
    } catch (error) {
        return error
    }
    
}