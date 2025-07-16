const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

const artistaCtl = {};

// Obtener todos los artistas
artistaCtl.obtenerArtistas = async (req, res) => {
    try {
        const [listaArtistas] = await sql.promise().query(`
            select * from artistas
        `);

        const artistasCompletos = await Promise.all(
            listaArtistas.map(async (artista) => {
                const artistaMongo = await mongo.artistaModel.findOne({ 
                    idArtistaSql: artista.idArtista 
                });
                return {
                    ...artista,
                    correo: descifrarDatos(artista.correo), // Desencriptar el correo
                    detallesMongo: artistaMongo
                };
            })
        );

        return res.apiResponse(artistasCompletos, 200, 'Artistas obtenidos exitosamente');
    } catch (error) {
        console.error('Error al obtener artistas:', error);
        return res.apiError('Error interno del servidor', 500);
    }
};

// Crear nuevo artista
artistaCtl.crearArtista = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono, direccion } = req.body;

        // Verificar si el artista ya existe
        const [existeArtista] = await sql.promise().query(
            'SELECT * FROM artistas WHERE correo = ?', 
            [cifrarDatos(correo)] // Encriptar el correo antes de verificar
        );

        if (existeArtista.length > 0) {
            return res.apiError('El artista ya existe con ese correo', 400);
        }

        // Crear en SQL
        const datosSql = {
            nombre,
            apellido,
            correo: cifrarDatos(correo), // Encriptar el correo
            estado: 'activo',
            createArtista: new Date().toLocaleString()
        };

        const nuevoArtista = await orm.artista.create(datosSql);
        const idArtista = nuevoArtista.idArtista;

        // Crear en MongoDB
        const datosMongo = {
            telefono: cifrarDatos(telefono),
            direccion,
            fotoPerfil: req.files?.fotoPerfil?.name || null,
            idArtistaSql: idArtista,
            createArtistaMongo: new Date().toLocaleString()
        };

        await mongo.artistaModel.create(datosMongo);

        return res.apiResponse(
            { idArtista }, 
            201, 
            'Artista creado exitosamente'
        );

    } catch (error) {
        console.error('Error al crear artista:', error);
        return res.apiError('Error al crear el artista', 500);
    }
};

// Obtener artista por ID
artistaCtl.obtenerArtistaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [artista] = await sql.promise().query(
            'SELECT * FROM artistas WHERE idArtista = ?', 
            [id]
        );

        if (artista.length === 0) {
            return res.apiError('Artista no encontrado', 404);
        }

        const artistaMongo = await mongo.artistaModel.findOne({ 
            idArtistaSql: id 
        });

        const artistaCompleto = {
            ...artista[0],
            correo: descifrarDatos(artista[0].correo), // Desencriptar el correo
            telefono: artistaMongo ? descifrarDatos(artistaMongo.telefono) : '',
            direccion: artistaMongo?.direccion || '',
            fotoPerfil: artistaMongo?.fotoPerfil || ''
        };

        return res.apiResponse(artistaCompleto, 200, 'Artista encontrado');
    } catch (error) {
        console.error('Error al obtener artista:', error);
        return res.apiError('Error interno del servidor', 500);
    }
};

// Actualizar artista
artistaCtl.actualizarArtista = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, telefono, direccion } = req.body;

        // Actualizar en SQL
        await sql.promise().query(`
            UPDATE artistas 
            SET nombre = ?, apellido = ?, correo = ?, updateArtista = ?
            WHERE idArtista = ?
        `, [nombre, apellido, cifrarDatos(correo), new Date().toLocaleString(), id]); // Encriptar el correo

        // Actualizar en MongoDB
        await mongo.artistaModel.updateOne(
            { idArtistaSql: id },
            {
                telefono: cifrarDatos(telefono),
                direccion,
                updateArtistaMongo: new Date().toLocaleString()
            }
        );

        return res.apiResponse(null, 200, 'Artista actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar artista:', error);
        return res.apiError('Error al actualizar el artista', 500);
    }
};

// Eliminar artista (cambiar estado)
artistaCtl.eliminarArtista = async (req, res) => {
    try {
        const { id } = req.params;

        await sql.promise().query(`
            UPDATE artistas 
            SET estado = 'inactivo', updateArtista = ?
            WHERE idArtista = ?
        `, [new Date().toLocaleString(), id]);

        return res.apiResponse(null, 200, 'Artista eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar artista:', error);
        return res.apiError('Error al eliminar el artista', 500);
    }
};

module.exports = artistaCtl;
