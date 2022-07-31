module.exports = (sequelize, type) => {
    const CustomFieldValueModel = sequelize.define('customFieldValue', {
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
    return CustomFieldValueModel
}