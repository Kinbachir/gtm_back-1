module.exports = (sequelize, type) => {
    const RoleModel = sequelize.define('role', {
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
    return RoleModel
}