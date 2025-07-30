// src/router/index.router.js
const express = require('express');
const router = express.Router();

// Esta es una ruta de bienvenida normal. NO envía "hola mundo".
router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Indiec' });
});

// Asegúrate de que no haya otras rutas conflictivas aquí.

module.exports = router;