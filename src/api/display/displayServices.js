import { Op } from 'sequelize'
import { Display, DisplayData, DisplaySection, DisplayType, Store, User, Category, Brand, DisplayCustomFieldValue, DisplayCustomField } from '../../config/database'

/**
 * 
 * @returns Display list
 */
export const findDisplay = async () => {
    return Display.findAll({
        include: [
            {
                model: DisplayData,
                as: 'displayData'
            },
            {
                model: Store,
            },
            {
                model: User,
            },
            {
                model: Category,
            },
            {
                model: Brand,
            },
            {
                model: DisplayCustomFieldValue,
                include: [
                    {
                        model: DisplayCustomField
                    }
                ]
            },
            {
                model: DisplayType,
                as: 'displayType',
                include: [
                    {
                        model: DisplaySection
                    }
                ]
            }
        ]
    });
}

/**
 * 
 * @param {integer} userId 
 * @param {date} from 
 * @param {date} to 
 * @returns Display list by user between two dates
 */
 export const findDisplayByUser = async (userId, from, to) => {
    return Display.findAll({
        where: {
            userId: userId,
            createdAt: {
                [Op.between]: [new Date(from).setDate(new Date(from).getDate() - 1), new Date(to).setDate(new Date(to).getDate()+1)]
            }
        },
        include: [
            {
                model: DisplayData,
                as: 'displayData'
            },
            {
                model: Store,
            },
            {
                model: User,
            },
            {
                model: Category,
            },
            {
                model: Brand,
            },
            {
                model: DisplayCustomFieldValue,
                include: [
                    {
                        model: DisplayCustomField
                    }
                ]
            },
            {
                model: DisplayType,
                as: 'displayType',
                include: [
                    {
                        model: DisplaySection
                    }
                ]
            }
        ]
    });
}

/**
 * 
 * @param {Display} display 
 * @description update display if the object contain an id otherwise it create a new one
 */
export const createDisplay = async (display) => {
    if (display.id) {
        return Display.update(
            display,
            {
                where: {
                    id: display.id
                }
            }
        )
    } else {
        return Display.create(display)
    }
}

/**
 * 
 * @param {Integer} displayId
 * @description delete display where id = displayId
 */
export const removeDisplay = async (displayId) => {
    Display.destroy({
        where: { id: displayId }
    })
}