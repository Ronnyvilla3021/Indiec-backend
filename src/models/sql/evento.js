const evento = (sequelize, type) => {
    return sequelize.define('eventos', {
        idEvento: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreEvento: type.STRING,
        ubicacion: type.STRING,
        fecha: type.DATE,
        generoMusical: type.STRING,
        estado: type.STRING,
        createEvento: type.STRING,
        updateEvento: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Eventos'
    })
}

module.exports = evento;