module.exports = (sequelize, type) => {
    const NotificationReferencingModel = sequelize.define('notificationReferencing', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
    return NotificationReferencingModel
}