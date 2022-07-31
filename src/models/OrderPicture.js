module.exports = (sequelize, type) => {
    const OrderPictureModel = sequelize.define('orderPicture', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: type.STRING,
            allowNull: true,
        },
        stockOut: {
            type: type.BOOLEAN,
            allowNull: true,
        },
    })
    return OrderPictureModel
}