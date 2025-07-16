const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    enlace: String,
    genero: String,
    imagen: String,
    idAlbumSql: String,
    createAlbumMongo: String,
    updateAlbumMongo: String,
}, {
    timestamps: false,
    collection: 'albumes'
});

const albumMongo = mongoose.model('albumes', albumSchema);
module.exports = albumMongo;
