const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema({
    contacto: String,
    capacidad: Number,
    descripcion: String,
    imagen: String,
    idEventoSql: String,
    createEventoMongo: String,
    updateEventoMongo: String,
}, {
    timestamps: false,
    collection: 'eventos'
});

const eventoMongo = mongoose.model('eventos', eventoSchema);
module.exports = eventoMongo;
