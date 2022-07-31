module.exports = (sequelize, type) => {
    const referencedProductModel = sequelize.define('referencedProduct', {
        storeId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        productId: {
            type: type.INTEGER,
            primaryKey: true,
        },
        available: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return referencedProductModel
}