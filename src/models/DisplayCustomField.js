const { ENUM } = require("sequelize")

module.exports = (sequelize, type) => {
    const DisplayCustomFieldModel = sequelize.define('displayCustomField', {
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
        type: {
            type: ENUM(["String", "Integer", "Double", "Date"])
        },
    })
    return DisplayCustomFieldModel
}