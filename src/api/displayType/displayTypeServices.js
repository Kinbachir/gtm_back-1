import { DisplayType, DisplaySection, DisplayCustomField } from '../../config/database'

/**
 * 
 * @returns DisplayType list
 */
export const findDisplayTypes = async () => {
    return DisplayType.findAll({
        include: [{
            model: DisplaySection,
            as: 'displaySections',
            include: [
                {
                    model: DisplayCustomField
                }
            ]
        },
    ],
    });
}

/**
 * 
 * @param {DisplayType} displayType 
 * @description update displayType if the object contain an id otherwise it create a new one
 */
export const createDisplayType = async (displayType) => {
    if (displayType.id) {
        return DisplayType.update(
            displayType,
            {
                where: {
                    id: displayType.id
                }
            }
        )
    } else {
        return DisplayType.create(displayType)
    }
}