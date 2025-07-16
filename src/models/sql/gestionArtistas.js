const gestionArtistas = (sequelize, type) => {
    return sequelize.define('gestion_artistas', {
        idGestion: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: type.STRING,
        estado: type.STRING,
        createGestion: type.STRING,
        updateGestion: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Gestión de Artistas'
    })
}

module.exports = gestionArtistas;