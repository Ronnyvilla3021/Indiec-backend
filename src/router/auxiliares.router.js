const express = require("express");
const router = express.Router();
const {
    obtenerGeneros,
    crearGenero,
    obtenerTallas,
    inicializarDatos
} = require('../controller/auxiliares.controller');

// Rutas para géneros
router.get('/generos', obtenerGeneros);
router.post('/generos', crearGenero);



// Rutas para tallas
router.get('/tallas', obtenerTallas);



// Ruta para inicializar datos básicos
router.post('/inicializar', inicializarDatos);

module.exports = router;