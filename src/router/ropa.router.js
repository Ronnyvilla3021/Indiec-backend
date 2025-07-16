const express = require('express');
const router = express.Router();

const { 
    mostrarRopa, 
    crearRopa,
    actualizarRopa,
    eliminarRopa 
} = require('../controller/ropa.controller');

// Obtener todas las prendas de ropa
router.get('/lista', mostrarRopa);

// Crear nueva prenda de ropa
router.post('/crear', crearRopa);

// Actualizar una prenda existente
router.put('/actualizar/:id', actualizarRopa);

// Eliminar (desactivar) una prenda
router.delete('/eliminar/:id', eliminarRopa);

module.exports = router;
