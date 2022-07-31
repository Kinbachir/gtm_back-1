module.exports = (sequelize, type) => {
    const InternalCodeModel = sequelize.define('internalCode', {
        storeGroupId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        productId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        code: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
    })
    return InternalCodeModel
}