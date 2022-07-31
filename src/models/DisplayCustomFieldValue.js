module.exports = (sequelize, type) => {
    const DisplayCustomFieldValueModel = sequelize.define('displayCustomFieldValue', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: type.STRING,
            allowNull: false,
        }
    })
    return DisplayCustomFieldValueModel
}