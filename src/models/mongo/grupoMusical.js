const mongoose = require('mongoose')

const grupoMusicalSchema = new mongoose.Schema({
    generoMusical: String,
    plataforma: String,
    descripcion: String,
    imagen: String,
    idGrupoSql: String,
    createGrupoMongo: String,
    updateGrupoMongo: String,
}, {
    timestamps: false,
    collection: 'grupos_musicales'
});

const grupoMusicalMongo = mongoose.model('grupos_musicales', grupoMusicalSchema);
module.exports = grupoMusicalMongo;