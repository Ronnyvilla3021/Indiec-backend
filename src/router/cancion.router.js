const express = require("express");
const router = express.Router();
const { 
    obtenerCanciones, 
    crearCancion, 
    obtenerCancionesPorArtista 
} = require('../controller/cancion.controller');

router.get('/lista', obtenerCanciones);
router.post('/crear', crearCancion);
router.get('/artista/:artistaId', obtenerCancionesPorArtista);

module.exports = router;