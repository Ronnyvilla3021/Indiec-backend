const express = require("express");
const router = express.Router();
const { 
    obtenerPerfilDisquera, 
    gestionarPerfilDisquera, 
    obtenerEstadisticas 
} = require('../controller/disquera.controller');

router.get('/perfil', obtenerPerfilDisquera);
router.post('/perfil', gestionarPerfilDisquera);
router.put('/perfil', gestionarPerfilDisquera);
router.get('/estadisticas', obtenerEstadisticas);

module.exports = router;