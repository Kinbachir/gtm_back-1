module.exports = (sequelize, type) => {
    const NotificationConfigModel = sequelize.define('notification', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        text: {
            type: type.STRING,
            allowNull: false,
        },
        consulted: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    return NotificationConfigModel
}