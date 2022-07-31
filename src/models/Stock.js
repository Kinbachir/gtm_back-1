module.exports = (sequelize, type) => {
    const StockModel = sequelize.define('stock', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: type.INTEGER,
            allowNull: true,
        },
        stockOut: {
            type: type.BOOLEAN,
            allowNull: true,
        },
    })
    return StockModel
}