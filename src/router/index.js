// En router/index.js

const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    // =======================================================================
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ LOG DE RASTREO #2 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    console.log(`<<<<< LOG RASTREO: LA PETICIÓN CAYÓ EN LA RUTA FINAL (catch-all) con método ${req.method} >>>>>`);
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    // =======================================================================

    // Aquí es donde probablemente se envía la página HTML
    res.send('<!doctype html><html><body><h1>Página de Inicio</h1></body></html>'); // O res.render('index'), etc.
});

module.exports = router;