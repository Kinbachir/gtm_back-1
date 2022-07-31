module.exports = (sequelize, type) => {
    const DisplayTypeModel = sequelize.define('displayType', {
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
        abbreviation: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        withBrand: {
            type: type.BOOLEAN,
        },
        withCategory: {
            type: type.BOOLEAN,
        },
    })
    return DisplayTypeModel
}