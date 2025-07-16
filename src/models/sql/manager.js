const manager = (sequelize, type) => {
    return sequelize.define('managers', {
        idManager: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: type.STRING,
        apellidos: type.STRING,
        correo: type.STRING,
        estado: type.STRING,
        createManager: type.STRING,
        updateManager: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Managers'
    })
}

module.exports = manager;