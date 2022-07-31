module.exports = (sequelize, type) => {
    const OrderDetailModel = sequelize.define('orderDetail', {
        orderId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        productId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        quantity: {
            type: type.INTEGER,
            allowNull: true,
        },
    })
    return OrderDetailModel
}