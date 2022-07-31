const { ENUM } = require("sequelize")

module.exports = (sequelize, type) => {
    const StockSettingModel = sequelize.define('stockSetting', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        days: {
            type: type.INTEGER,
            allowNull: false,
        },
        stockManagement: {
            type: ENUM(["StockOut", "Quantity"]),
            allowNull: false,
        },
    })
    return StockSettingModel
}