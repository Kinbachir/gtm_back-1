const { ENUM } = require("sequelize")

module.exports = (sequelize, type) => {
    const UserModel = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING,
            allowNull: false
        },
        last_name: {
            type: type.STRING,
            allowNull: false
        },
        gender: {
            type: ENUM(["M", "F"]),
            defaultValue: "M"
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: true,
            unique: true
        },
        phone_number: {
            type: type.STRING,
            allowNull: false,
            unique: true

        },
        profile_picture: {
            type: type.STRING,
            allowNull: true,
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return UserModel
}