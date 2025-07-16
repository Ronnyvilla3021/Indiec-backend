const talla = (sequelize, type) => {
    return sequelize.define('tallas', {
        idTalla: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreTalla: type.STRING,
        descripcion: type.STRING,
        estado: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Tallas'
    })
}

module.exports = talla;