const estado = (sequelize, type) => {
    return sequelize.define('estados', {
        idEstado: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreEstado: type.STRING,
        descripcion: type.STRING,
        tipo: type.STRING, // 'general', 'producto', 'usuario', etc.
    }, {
        timestamps: false,
        comment: 'Tabla de Estados'
    })
}

module.exports = estado;
