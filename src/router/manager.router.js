const express = require('express');
const router = express.Router();

const { 
    mostrarManagers, 
    crearManager, 
    actualizarManager, 
    eliminarManager 
} = require('../controller/manager.controller');

// Obtener todos los managers
router.get('/lista', mostrarManagers);

// Crear nuevo manager
router.post('/crear', crearManager);

// Actualizar un manager existente
router.put('/actualizar/:id', actualizarManager);

// Eliminar (desactivar) un manager
router.delete('/eliminar/:id', eliminarManager);

module.exports = router;
