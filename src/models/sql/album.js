const album = (sequelize, type) => {
    return sequelize.define('albumes', {
        idAlbum: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tituloAlbum: type.STRING,
        anoLanzamiento: type.INTEGER,
        estado: type.STRING,
        createAlbum: type.STRING,
        updateAlbum: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Álbumes'
    })
}

module.exports = album;