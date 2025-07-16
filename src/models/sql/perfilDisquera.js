const perfilDisquera = (sequelize, type) => {
    return sequelize.define('perfil_disqueras', {
        idDisquera: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreDisquera: type.STRING,
        correo: type.STRING,
        estado: type.STRING,
        createDisquera: type.STRING,
        updateDisquera: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Perfil Disquera'
    })
}

module.exports = perfilDisquera;