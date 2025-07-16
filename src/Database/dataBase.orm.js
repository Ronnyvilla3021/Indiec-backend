const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

// Sincronización de la base de datos
const syncOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('Base de Datos sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la Base de Datos:', error);
    });

//extracionModelos
const usuarioModel = require('../models/sql/usuario')
const rolModel = require('../models/sql/rol')
const detalleRolModel = require('../models/sql/detalleRol')
const pageModel = require('../models/sql/page')
const artistaModel = require('../models/sql/artista');
const cancionModel = require('../models/sql/cancion');
const albumModel = require('../models/sql/album');
const grupoMusicalModel = require('../models/sql/grupoMusical');
const managerModel = require('../models/sql/manager');
const eventoModel = require('../models/sql/evento');
const perfilDisqueraModel = require('../models/sql/perfilDisquera');
const gestionArtistasModel = require('../models/sql/gestionArtistas');
const registroVentasModel = require('../models/sql/registroVentas');
const clienteModel = require('../models/sql/cliente');
const ropaModel = require('../models/sql/ropa');
const carritoModel = require('../models/sql/carrito');
const artista_EventoModel = require("../models/sql/artista_evento");
const generoModel = require("../models/sql/genero");
const tallaModel = require("../models/sql/talla");
const estadoModel = require("../models/sql/estado");

//intaciar los modelos a sincronizar
const usuario = usuarioModel(sequelize, Sequelize)
const rol = rolModel(sequelize, Sequelize)
const detalleRol = detalleRolModel(sequelize, Sequelize)
const page = pageModel(sequelize, Sequelize)
const artista = artistaModel(sequelize, Sequelize);
const cancion = cancionModel(sequelize, Sequelize);
const album = albumModel(sequelize, Sequelize);
const grupoMusical = grupoMusicalModel(sequelize, Sequelize);
const manager = managerModel(sequelize, Sequelize);
const evento = eventoModel(sequelize, Sequelize);
const perfilDisquera = perfilDisqueraModel(sequelize, Sequelize);
const gestionArtistas = gestionArtistasModel(sequelize, Sequelize);
const registroVentas = registroVentasModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);
const ropa = ropaModel(sequelize, Sequelize);
const carrito = carritoModel(sequelize, Sequelize);
const artista_Evento = artista_EventoModel(sequelize, Sequelize);
const genero = generoModel(sequelize, Sequelize);
const talla = tallaModel(sequelize, Sequelize);
const estado = estadoModel(sequelize, Sequelize)


//relaciones o foreingKeys

usuario.hasMany(detalleRol)
detalleRol.belongsTo(usuario)

rol.hasMany(detalleRol)
detalleRol.belongsTo(rol)

usuario.hasMany(page)
page.belongsTo(usuario)

artista.hasMany(cancion);
cancion.belongsTo(artista);

artista.hasMany(album);
album.belongsTo(artista);

album.hasMany(cancion);
cancion.belongsTo(album);

manager.hasMany(artista);
artista.belongsTo(manager);

perfilDisquera.hasMany(gestionArtistas);
gestionArtistas.belongsTo(perfilDisquera);

cliente.hasMany(carrito);
carrito.belongsTo(cliente);

artista.hasMany(artista_Evento);
artista_Evento.belongsTo(artista);

evento.hasMany(artista_Evento);
artista_Evento.belongsTo(evento);

// Artistas y Grupos Musicales (muchos a muchos)
artista.belongsToMany(grupoMusical, { 
    through: 'artista_grupo_musical',
    foreignKey: 'artistaId',
    otherKey: 'grupoId'
});
grupoMusical.belongsToMany(artista, { 
    through: 'artista_grupo_musical',
    foreignKey: 'grupoId',
    otherKey: 'artistaId'
}); 

// Exportar el objeto sequelize
module.exports = {
    usuario,
    rol,
    detalleRol,
    page,
    artista,
    cancion,
    album,
    manager,
    perfilDisquera,
    gestionArtistas,
    cliente,
    carrito,
    artista_Evento,
    evento,
    registroVentas,
    ropa,
    grupoMusical,
    genero,
    talla,
    estado

};