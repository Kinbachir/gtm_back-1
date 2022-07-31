module.exports = (sequelize, type) => {
    const ProductPictureModel = sequelize.define('productPicture', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: type.STRING,
            allowNull: true,
        },
    })
    return ProductPictureModel
}