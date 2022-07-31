module.exports = (sequelize, type) => {
    const ProductModel = sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        barcode: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        typology: {
            type: type.INTEGER,
            allowNull: false
        },
        path: {
            type: type.STRING,
            allowNull: true
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return ProductModel
}