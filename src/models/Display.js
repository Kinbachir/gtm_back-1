module.exports = (sequelize, type) => {
    const DisplayModel = sequelize.define('display', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    })
    return DisplayModel
}