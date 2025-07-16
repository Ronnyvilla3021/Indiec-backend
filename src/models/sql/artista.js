const artista = (sequelize, type) => {
    return sequelize.define('artistas', {
        idArtista: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: type.STRING,
        apellido: type.STRING,
        correo: type.STRING,
        estado: type.STRING,
        createArtista: type.STRING,
        updateArtista: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Artistas'
    })
}

module.exports = artista;