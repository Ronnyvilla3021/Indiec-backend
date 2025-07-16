const mongoose = require('mongoose')

const cancionSchema = new mongoose.Schema({
    duracion: String,
    genero: String,
    imagen: String,
    idCancionSql: String,
    createCancionMongo: String,
    updateCancionMongo: String,
}, {
    timestamps: false,
    collection: 'canciones'
});

const cancionMongo = mongoose.model('canciones', cancionSchema);
module.exports = cancionMongo;