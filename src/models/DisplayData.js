module.exports = (sequelize, type) => {
    const DisplayDataModel = sequelize.define('displayData', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: type.STRING,
            allowNull: false,
        },
    })
    return DisplayDataModel
}