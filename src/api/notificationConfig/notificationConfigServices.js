import { NotificationConfig, NotificationReferencing,Product,Store,User } from '../../config/database'

/**
 * 
 * @returns notificationConfig list
 */
export const findNotificationConfigs = async () => {
    return NotificationConfig.findAll({
        include: [
            {
                model: NotificationReferencing,
                include: [
                    {
                        model: Product,
                    },
                    {
                        model: Store
                    },
                    {
                        model: User
                    }
                ]
            },
        ]
    });
}

/**
 * 
 * @returns notificationConfig list by type
 */
export const findNotificationConfigsByType = async (type) => {
    return NotificationConfig.findAll({
        where: {
            type: type
        },
        include: [
            {
                model: NotificationReferencing,
                include: [
                    {
                        model: Product,
                    },
                    {
                        model: Store
                    },
                    {
                        model: User
                    }
                ]
            },
        ]
    });
}

/**
 * 
 * @param {NotificationConfig} notificationConfig 
 * @description update NotificationConfig if the object contain an id otherwise it create a new one
 */
export const createNotificationConfig = async (notificationConfig) => {
    if (notificationConfig.id) {
        return NotificationConfig.update(
            notificationConfig,
            {
                where: {
                    id: notificationConfig.id
                }
            }
        )
    } else {
        return NotificationConfig.create(notificationConfig)
    }
}

/**
 * 
 * @param {NotificationReferencing} notificationReferencing 
 * @description update NotificationReferencing if the object contain an id otherwise it create a new one
 */
export const createNotificationReferencing = async (notificationRef) => {
    if (notificationRef.id) {
        return NotificationReferencing.update(
            notificationRef,
            {
                where: {
                    id: notificationRef.id
                }
            }
        )
    } else {
        return NotificationReferencing.create(notificationRef)
    }
}