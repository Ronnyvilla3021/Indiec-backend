const express = require('express');
const router = express.Router();

const { 
    mostrarCarritos, 
    crearCarrito, 
    actualizarCarrito, 
    eliminarCarrito 
} = require('../controller/carrito.controller');

// Obtener todos los carritos
router.get('/lista', mostrarCarritos);

// Crear nuevo carrito
router.post('/crear', crearCarrito);

// Actualizar un carrito existente
router.put('/actualizar/:id', actualizarCarrito);

// Eliminar (desactivar) un carrito
router.delete('/eliminar/:id', eliminarCarrito);

module.exports = router;
