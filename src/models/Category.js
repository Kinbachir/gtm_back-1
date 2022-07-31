module.exports = (sequelize, type) => {
    const CategoryModel = sequelize.define('category', {
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
    return CategoryModel
}