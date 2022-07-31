module.exports = (sequelize, type) => {
    const OrderModel = sequelize.define('order', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: type.STRING,
            allowNull: true,
        },
        date: {
            type: type.DATE,
            allowNull: true,
        },
        amount: {
            type: type.DOUBLE,
            allowNull: true,
        },
    })
    return OrderModel
}