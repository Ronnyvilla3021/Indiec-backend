const mongoose = require('mongoose');

const artistaSchema = new mongoose.Schema({
    telefono: String,
    direccion: String,
    fotoPerfil: String,
    idArtistaSql: String,
    createArtistaMongo: String,
    updateArtistaMongo: String,
}, {
    timestamps: false,
    collection: 'artistas'
});

const artistaMongo = mongoose.model('artistas', artistaSchema);
module.exports = artistaMongo;