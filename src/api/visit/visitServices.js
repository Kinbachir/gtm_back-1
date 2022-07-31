import { Brand, Category, Display, DisplayCustomField, DisplayCustomFieldValue, DisplayData, DisplaySection, DisplayType, Order, OrderDetail, OrderPicture, Product, Stock, Store, User, Visit } from '../../config/database'
import { Op } from 'sequelize'

/**
 * 
 * @returns visit list by user (merchandiser)
 */
export const findVisitsByUser = async (userId, from, to) => {
    return Visit.findAll({
        include: [
            {
                model: Store
            },
            {
                model: User
            },
            {
                model: Stock,
                include: [
                    {
                        model: Product
                    }
                ]
            },
            {
                model: Order,
                include: [
                    {
                        model: OrderDetail,
                        include: [
                            {
                                model: Product
                            }
                        ]
                    },
                    {
                        model: OrderPicture
                    }
                ]
            },
            {
                model: Display,
                include: [
                    {
                        model: DisplayData
                    },
                    {
                        model: User,
                    },
                    {
                        model: Category
                    },
                    {
                        model: Brand
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
                        include: [
                            {
                                model: DisplaySection
                            }
                        ]
                    }
                ]
            }
        ],
        where: {
            userId: userId,
            day: {
                [Op.between]: [new Date(from).setHours(0), new Date(new Date(to).setHours(23)).setMinutes(59)],
            },
        }
    });
}

/**
 * 
 * @param {Visit} visit 
 * @description update visit if the object contain an id otherwise it create a new one
 */
export const createVisit = async (visit) => {
    if (visit.id) {
        return Visit.update(
            visit,
            {
                where: {
                    id: visit.id
                }
            }
        )
    } else {
        return Visit.create(visit)
    }
}

/**
 * 
 * @param {Integer} visitId
 * @description delete visit where id = visitId
 */
export const removeVisit = async (visitId) => {
    Visit.destroy({
        where: { id: visitId }
    })
} 