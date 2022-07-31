module.exports = (sequelize, type) => {
    const BrandModel = sequelize.define('brand', {
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
        path: {
            type: type.STRING,
            allowNull: true,
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return BrandModel
}