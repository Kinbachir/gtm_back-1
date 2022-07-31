module.exports = (sequelize, type) => {
    const PermissionModel = sequelize.define('permission', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        can_create: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        can_read: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        can_update: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        module: {
            type: type.STRING,
            allowNull: false
        },
    })
    return PermissionModel
}