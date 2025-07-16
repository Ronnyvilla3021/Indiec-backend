const grupoMusical = (sequelize, type) => {
    return sequelize.define('grupos_musicales', {
        idGrupo: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreGrupo: type.STRING,
        estado: type.STRING,
        createGrupo: type.STRING,
        updateGrupo: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Grupos Musicales'
    })
}

module.exports = grupoMusical;