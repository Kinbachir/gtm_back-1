module.exports = (sequelize, type) => {
    const DisplaySectionModel = sequelize.define('displaySection', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
    })
    return DisplaySectionModel
}