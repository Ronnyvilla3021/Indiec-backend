const mongoose = require('mongoose')

const perfilDisqueraSchema = new mongoose.Schema({
    direccion: String,
    telefono: String,
    descripcion: String,
    fotoImagen: String,
    idDisqueraSql: String,
    createDisqueraMongo: String,
    updateDisqueraMongo: String,
}, {
    timestamps: false,
    collection: 'perfil_disqueras'
});

const perfilDisqueraMongo = mongoose.model('perfil_disqueras', perfilDisqueraSchema);
module.exports = perfilDisqueraMongo;