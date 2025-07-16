const express = require("express");
const router = express.Router();
const { 
    obtenerEventos, 
    crearEvento 
} = require('../controller/evento.controller');

router.get('/lista', obtenerEventos);
router.post('/crear', crearEvento);

module.exports = router;