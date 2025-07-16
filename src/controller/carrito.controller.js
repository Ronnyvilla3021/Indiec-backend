const carritoCtl = {};
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');

// Mostrar todos los carritos
carritoCtl.mostrarCarritos = async (req, res) => {
    try {
        const [listaCarritos] = await sql.promise().query('SELECT * FROM carritos WHERE estado = "activo"');
        return res.json(listaCarritos);
    } catch (error) {
        console.error('Error al mostrar carritos:', error);
        return res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
    }
};

// Crear nuevo carrito
carritoCtl.crearCarrito = async (req, res) => {
    try {
        const { producto, tipoProducto, cantidad } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!producto || !tipoProducto || !cantidad) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const envioSQL = {
            producto,
            tipoProducto,
            cantidad,
            estado: 'activo',
            createCarrito: new Date().toLocaleString(),
        };

        const nuevoCarrito = await orm.carrito.create(envioSQL);
        return res.status(201).json({ message: 'Éxito al guardar', idCarrito: nuevoCarrito.idCarrito });
    } catch (error) {
        console.error('Error al crear carrito:', error);
        return res.status(500).json({ message: 'Error al guardar el carrito', error: error.message });
    }
};

// Actualizar carrito
carritoCtl.actualizarCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, tipoProducto, cantidad } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!producto || !tipoProducto || !cantidad) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const [result] = await sql.promise().query(`
            UPDATE carritos 
            SET producto = ?, tipoProducto = ?, cantidad = ?, updateCarrito = ?
            WHERE idCarrito = ?
        `, [producto, tipoProducto, cantidad, new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        return res.json({ message: 'Carrito actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
        return res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
    }
};

// Eliminar carrito (cambiar estado a inactivo)
carritoCtl.eliminarCarrito = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await sql.promise().query(`
            UPDATE carritos 
            SET estado = 'inactivo', updateCarrito = ?
            WHERE idCarrito = ?
        `, [new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        return res.json({ message: 'Carrito eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar carrito:', error);
        return res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
    }
};

module.exports = carritoCtl;
