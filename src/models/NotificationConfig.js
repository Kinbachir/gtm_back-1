module.exports = (sequelize, type) => {
    const NotificationConfigModel = sequelize.define('notificationConfig', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        sms: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: type.STRING,
            allowNull: false,
        },
        pointage_type: {
            type: type.STRING,
        },
        pointage_time: {
            type: type.TIME,
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return NotificationConfigModel
}