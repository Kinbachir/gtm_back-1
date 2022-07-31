import { Notification, Stock, SurveyResponse, User, Visit } from '../../config/database'
import { Op } from 'sequelize'

export const getStockStatus = (stockManagement, stores, products) => {
    if (stockManagement === "stockOut") {
        return Stock.findAll({
            where: {
                storeId: { [Op.in]: stores },
                productId: { [Op.in]: products },
                createdAt: {
                    [Op.between]: [new Date(new Date().setHours(0)).setMinutes(0), new Date(new Date().setHours(23)).setMinutes(59)],
                },
                stockOut: true
            }
        })
    } else {
        return Stock.findAll({
            where: {
                storeId: { [Op.in]: stores },
                productId: { [Op.in]: products },
                createdAt: {
                    [Op.between]: [new Date(new Date().setHours(0)).setMinutes(0), new Date(new Date().setHours(23)).setMinutes(59)],
                },
                quantity: 0
            }
        })
    }
}

/**
 * 
 * @returns Notification list
 */
export const findNotifications = async (userId, limit, offset) => {
    const user=await User.findOne({
        where: {
            id: userId
        }})
        if(user.dataValues.roleId==1)
    return Notification.findAll({
        order: [
            ['id', 'DESC'],
        ],
        limit: limit,
        offset: offset
    });
    return [];
}

/**
 * 
 * @returns count not consulted notifications
 */
export const findConsultedNotifications = async (userId) => {
    const user=await User.findOne({
        where: {
            id: userId
        }})
        if(user.dataValues.roleId==1)
    return Notification.count({
        where: {
            consulted: false
        }
    });
    return 0;
}

/**
 * 
 * @returns unrealized visit list
 */
export const findUnrealizedVisits = async (from, to) => {
    return Visit.findAll({
        include: [
            {
                model: User,
            },
            {
                model: SurveyResponse,
            },

        ],
        where: {
            day: {
                [Op.between]: [new Date().setDate(new Date().getDate() - 1), new Date()],
            },
        }
    });
}

export const pointageAlert = async (from, to, stores, users) => {
    return Visit.findAll({
        where: {
            day: {
                [Op.between]: [new Date(from), new Date(to).setDate(new Date(to).getDate())]
            },
            storeId: { [Op.in]: stores },
            userId: { [Op.in]: users },
            planned: true
        },
        include: [
            {
                model: User
            }
        ]
    });
}

/**
 * 
 * @param {Notification} notification 
 * @description create a new Notification if the object contain an id otherwise it create a new one
 */
export const upsertNotification = async (notification) => {
    if (notification.id) {
        return Notification.update(
            notification,
            {
                where: {
                    id: notification.id
                }
            }
        )
    } else {
        return Notification.create(notification)
    }
}