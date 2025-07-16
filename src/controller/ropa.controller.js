const ropaCtl = {};
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

function safeDecrypt(data) {
    try {
        return descifrarDatos(data);
    } catch (error) {
        console.error('Error al descifrar datos:', error.message);
        return ''; // Devolver una cadena vacía si ocurre un error
    }
}

// Mostrar toda la ropa
ropaCtl.mostrarRopa = async (req, res) => {
    try {
        const [listaRopa] = await sql.promise().query('SELECT * FROM ropas');
        return res.json(listaRopa);
    } catch (error) {
        console.error('Error al mostrar ropa:', error);
        return res.status(500).json({ message: 'Error al obtener la ropa', error: error.message });
    }
};

// Crear nueva ropa
ropaCtl.crearRopa = async (req, res) => {
    try {
        const { nombre, artista, tipo, talla } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!nombre || !artista || !tipo || !talla) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const envioSQL = {
            nombre,
            artista,
            tipo,
            talla,
            estado : 'activo',
            createRopa: new Date().toLocaleString()
        };

        const nuevaRopa = await orm.ropa.create(envioSQL);
        return res.status(201).json({ message: 'Éxito al guardar', idRopa: nuevaRopa.idRopa });
    } catch (error) {
        console.error('Error al crear ropa:', error);
        return res.status(500).json({ message: 'Error al guardar la ropa', error: error.message });
    }
};

// Actualizar ropa
ropaCtl.actualizarRopa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, artista, tipo, talla } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!nombre || !artista || !tipo || !talla) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const [result] = await sql.promise().query(`
            UPDATE ropas 
            SET nombre = ?, artista = ?, tipo = ?, talla = ?, updateRopa = ?
            WHERE idRopa = ?
        `, [nombre, artista, tipo, talla, new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ropa no encontrada' });
        }

        return res.json({ message: 'Ropa actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar ropa:', error);
        return res.status(500).json({ message: 'Error al actualizar la ropa', error: error.message });
    }
};

// Eliminar ropa (cambiar estado a inactivo)
ropaCtl.eliminarRopa = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await sql.promise().query(`
            UPDATE ropas 
            SET estado = 'inactivo', updateRopa = ?
            WHERE idRopa = ?
        `, [new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ropa no encontrada' });
        }

        return res.json({ message: 'Ropa eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar ropa:', error);
        return res.status(500).json({ message: 'Error al eliminar la ropa', error: error.message });
    }
};

module.exports = ropaCtl;
