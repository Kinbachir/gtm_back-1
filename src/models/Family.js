module.exports = (sequelize, type) => {
    const FamilyModel = sequelize.define('family', {
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
    })
    return FamilyModel
}