module.exports = (sequelize, type) => {
    const VisitModel = sequelize.define('visit', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: type.DATE,
            allowNull: false,
        },
        order: {
            type: type.INTEGER,
            allowNull: false,
        },
        planned: {
            type: type.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        start: {
            type: type.DATE,
            allowNull: true,
        },
        end: {
            type: type.DATE,
            allowNull: true,
        }
    })
    return VisitModel
}