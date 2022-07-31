import { DisplaySection, DisplayCustomField } from '../../config/database'

/**
 * 
 * @returns DisplaySection list by displayTypeId
 */
export const findDisplaySectionsBydisplayType = async (displayTypeId) => {
    return DisplaySection.findAll({
        where: {
            displayTypeId: displayTypeId
        },
        include: [
            {
                model: DisplayCustomField,
            }
        ]
    });
}

/**
 * 
 * @param {DisplaySection} displaySection 
 * @description update displaySection if the object contain an id otherwise it create a new one
 */
export const createDisplaySection = async (displaySection) => {
    if (displaySection.id) {
        return DisplaySection.update(
            displaySection,
            {
                where: {
                    id: displaySection.id
                }
            }
        )
    } else {
        return DisplaySection.create(displaySection)
    }
}