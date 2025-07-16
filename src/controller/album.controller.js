const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

const albumCtl = {};

// Obtener todos los álbumes
albumCtl.obtenerAlbumes = async (req, res) => {
    try {
        const [listaAlbumes] = await sql.promise().query(`
            select * from albumes
        `);

        const albumesCompletos = await Promise.all(
            listaAlbumes.map(async (album) => {
                const albumMongo = await mongo.albumModel.findOne({ 
                    idAlbumSql: album.idAlbum 
                });
                return {
                    ...album,
                    detallesMongo: albumMongo
                };
            })
        );

        return res.apiResponse(albumesCompletos, 200, 'Álbumes obtenidos exitosamente');
    } catch (error) {
        console.error('Error al obtener álbumes:', error);
        return res.apiError('Error interno del servidor', 500);
    }
};

// Crear nuevo álbum
albumCtl.crearAlbum = async (req, res) => {
    try {
        const { tituloAlbum, artista, anoLanzamiento, enlace, genero, artistaIdArtista } = req.body;

        // Crear en SQL
        const datosSql = {
            tituloAlbum,
            artista,
            anoLanzamiento: parseInt(anoLanzamiento),
            estado: 'activo',
            createAlbum: new Date().toLocaleString(),
            artistaIdArtista
        };

        const nuevoAlbum = await orm.album.create(datosSql);
        const idAlbum = nuevoAlbum.idAlbum;

        // Crear en MongoDB
        const datosMongo = {
            enlace,
            genero,
            imagen: req.files?.imagen?.name || null,
            idAlbumSql: idAlbum,
            createAlbumMongo: new Date().toLocaleString()
        };

        await mongo.albumModel.create(datosMongo);

        return res.apiResponse(
            { idAlbum }, 
            201, 
            'Álbum creado exitosamente'
        );

    } catch (error) {
        console.error('Error al crear álbum:', error);
        return res.apiError('Error al crear el álbum', 500);
    }
};

module.exports = albumCtl;