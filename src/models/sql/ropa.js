const ropa = (sequelize, type) => {
    return sequelize.define('ropa', {
        idRopa: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: type.STRING,
        artista: type.STRING,
        tipo: type.STRING,
        talla: type.STRING,
        estado: type.STRING,
        createRopa: type.STRING,
        updateRopa: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Ropa'
    })
}

module.exports = ropa;