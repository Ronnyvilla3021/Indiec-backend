const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
// ¡¡CORRECCIÓN IMPORTANTE AQUÍ!! 
// En tu primer código me mostraste 'dataBaseMongose'. Usaré ese. 
// Si el nombre del archivo es diferente, ajústalo aquí.
const mongo = require('../Database/dataBaseMongose'); 
// const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

const albumCtl = {};

// --- OBTENER ÁLBUMES (VERSIÓN ROBUSTA CON DEPURACIÓN) ---
albumCtl.obtenerAlbumes = async (req, res) => {
    console.log("-> Iniciando obtenerAlbumes..."); // Log de inicio

    try {
        // 1. Obtenemos la lista base de álbumes desde SQL
        const [listaAlbumes] = await sql.promise().query('SELECT * FROM albumes');
        console.log(`-> SQL Query exitosa. Se encontraron ${listaAlbumes.length} álbumes.`);

        // Si no hay álbumes, devolvemos un array vacío para evitar errores.
        if (listaAlbumes.length === 0) {
            console.log("-> No hay álbumes en la base de datos SQL. Devolviendo respuesta vacía.");
            return res.apiResponse([], 200, 'No hay álbumes para mostrar');
        }

        // 2. Mapeamos y buscamos los detalles en MongoDB
        const albumesCompletos = await Promise.all(
            listaAlbumes.map(async (album) => {
                // SEGURIDAD: Verificamos que el álbum y su ID no sean nulos
                if (!album || typeof album.idAlbum === 'undefined') {
                    console.warn("-> Se encontró un álbum inválido o sin ID en SQL:", album);
                    return { ...album, detallesMongo: null }; // Devolvemos el álbum sin detalles
                }

                const albumIdStr = album.idAlbum.toString();
                // DEBUG: Mostramos qué ID estamos buscando en MongoDB
                console.log(`-> Buscando en MongoDB detalles para el idAlbumSql: ${albumIdStr}`);

                const detallesMongo = await mongo.albumModel.findOne({ 
                    idAlbumSql: albumIdStr
                }).lean();

                // DEBUG: Mostramos si se encontraron los detalles
                if (detallesMongo) {
                    console.log(`   ... Detalles encontrados para ${albumIdStr}`);
                } else {
                    console.warn(`   ... ¡Alerta! No se encontraron detalles en MongoDB para ${albumIdStr}`);
                }

                return {
                    ...album,
                    detallesMongo: detallesMongo // Anidamos el resultado (puede ser null)
                };
            })
        );

        console.log("-> Combinación de datos completada exitosamente.");
        return res.apiResponse(albumesCompletos, 200, 'Álbumes obtenidos exitosamente');

    } catch (error) {
        // ¡¡ESTE ES EL LOG MÁS IMPORTANTE!!
        // Nos dirá el error exacto y la línea donde ocurre en el backend.
        console.error('--- !!! CRASH EN obtenerAlbumes !!! ---');
        console.error(error); // Imprime el objeto de error completo y su stack trace
        console.error('--------------------------------------');
        return res.apiError('Error interno del servidor al obtener álbumes', 500);
    }
};

// --- CREAR NUEVO ÁLBUM (VERSIÓN CORREGIDA Y ROBUSTA) ---
albumCtl.crearAlbum = async (req, res) => {
    // Usamos los nombres del frontend
    const { titulo, artista, año, url, genero, artistaIdArtista } = req.body;

    try {
        // Guardamos en SQL
        const datosSql = {
            tituloAlbum: titulo,
            anoLanzamiento: parseInt(año),
            estado: 'activo',
            createAlbum: new Date().toLocaleString(),
            artistaIdArtista
        };
        const nuevoAlbumSql = await orm.album.create(datosSql);
        const idAlbum = nuevoAlbumSql.idAlbum;

        // Guardamos en MongoDB con TODOS los detalles
        const datosMongo = {
            idAlbumSql: idAlbum.toString(),
            titulo,
            artista,
            año,
            genero,
            url,
            imagen: req.files?.imagen?.name || null,
            createAlbumMongo: new Date().toLocaleString()
        };
        await mongo.albumModel.create(datosMongo);

        return res.apiResponse({ idAlbum }, 201, 'Álbum creado exitosamente');

    } catch (error) {
        console.error('--- !!! CRASH EN crearAlbum !!! ---');
        console.error(error);
        console.error('-----------------------------------');
        return res.apiError('Error al crear el álbum', 500);
    }
};

module.exports = albumCtl;