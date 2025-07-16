const genero = (sequelize, type) => {
    return sequelize.define('generos', {
        idGenero: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreGenero: type.STRING,
        descripcion: type.STRING,
        estado: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Géneros Musicales'
    })
}

module.exports = genero;