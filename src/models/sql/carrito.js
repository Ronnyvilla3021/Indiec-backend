const carrito = (sequelize, type) => {
    return sequelize.define('carritos', {
        idCarrito: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        producto: type.STRING,
        tipoProducto: type.STRING,
        cantidad: type.INTEGER,
        estado: type.STRING,
        createCarrito: type.STRING,
        updateCarrito: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Carrito'
    })
}

module.exports = carrito;