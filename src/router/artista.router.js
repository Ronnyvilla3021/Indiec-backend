const express = require("express");
const router = express.Router();
const { 
    obtenerArtistas, 
    crearArtista, 
    obtenerArtistaPorId, 
    actualizarArtista, 
    eliminarArtista 
} = require('../controller/artista.controller');

// Middleware de autenticación (opcional)
// const isLoggedIn = require('../lib/auth');

router.get('/lista', obtenerArtistas);
router.post('/crear', crearArtista);
router.get('/:id', obtenerArtistaPorId);
router.put('/:id', actualizarArtista);
router.delete('/:id', eliminarArtista);

module.exports = router;
