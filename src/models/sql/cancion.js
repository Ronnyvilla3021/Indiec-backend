const cancion = (sequelize, type) => {
    return sequelize.define('canciones', {
        idCancion: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titulo: type.STRING,
        album: type.STRING,
        año: type.INTEGER,
        estado: type.STRING,
        createCancion: type.STRING,
        updateCancion: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Canciones'
    })
}

module.exports = cancion;