const registroVentas = (sequelize, type) => {
    return sequelize.define('registro_ventas', {
        idVenta: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productoNombre: type.STRING,
        tipoProducto: type.STRING,
        fecha: type.DATE,
        cantidad: type.INTEGER,
        estado: type.STRING,
        createVenta: type.STRING,
        updateVenta: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Registro de Ventas'
    })
}

module.exports = registroVentas;