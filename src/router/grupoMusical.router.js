const express = require('express');
const router = express.Router();

const { 
    mostrarGrupos, 
    crearGrupo, 
    actualizarGrupo, 
    eliminarGrupo 
} = require('../controller/grupoMusical.controller');

// Obtener todos los grupos musicales
router.get('/lista', mostrarGrupos);

// Crear nuevo grupo musical
router.post('/crear', crearGrupo);

// Actualizar un grupo musical existente
router.put('/actualizar/:id', actualizarGrupo);

// Eliminar (desactivar) un grupo musical
router.delete('/eliminar/:id', eliminarGrupo);

module.exports = router;
