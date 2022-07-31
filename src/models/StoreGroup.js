module.exports = (sequelize, type) => {
    const StoreGroupModel = sequelize.define('storeGroup', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        path: {
            type: type.STRING,
            allowNull: true,
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return StoreGroupModel
}