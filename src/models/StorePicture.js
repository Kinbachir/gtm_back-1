module.exports = (sequelize, type) => {
    const StorePictureModel = sequelize.define('storePicture', {
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
    return StorePictureModel
}