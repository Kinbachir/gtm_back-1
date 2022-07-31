module.exports = (sequelize, type) => {
    const StoreModel = sequelize.define('store', {
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
        address: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        governorate: {
            type: type.STRING,
            allowNull: false,
        },
        postal_code: {
            type: type.INTEGER,
            allowNull: false,
        },
        type: {
            type: type.STRING,
            allowNull: true,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        phone_number: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        lat: {
            type: type.DOUBLE,
            allowNull: true,
        },
        lng: {
            type: type.DOUBLE,
            allowNull: true,
        },
        path: {
            type: type.STRING,
            allowNull: true,
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
    return StoreModel
}