const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    fechaNacimiento: String,
    genero: String,
    imagen: String,
    idManagerSql: String,
    createManagerMongo: String,
    updateManagerMongo: String,
}, {
    timestamps: false,
    collection: 'managers'
});

const managerMongo = mongoose.model('managers', managerSchema);
module.exports = managerMongo;
