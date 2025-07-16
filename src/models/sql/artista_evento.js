const artista_Evento = (sequelize, type) => {
    return sequelize.define('artista_eventos', {
        id_artista_evento: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        createArtista_Evento: type.STRING,
        updateArtista_Evento: type.STRING,
    }, {
        timestamps: false,
        Comment: 'artista_evento'
    });
}

module.exports = artista_Evento;