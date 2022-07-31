const { ENUM } = require("sequelize")

module.exports = (sequelize, type) => {
    const CustomFieldModel = sequelize.define('customField', {
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
        table_name: {
            type: type.STRING,
            allowNull: true,
        },
        type: {
            type: ENUM(["String", "Integer", "Double", "Date"])
        },
    })
    return CustomFieldModel
}