const express = require("express");
const router = express.Router();
const { 
    registrarVenta, 
    obtenerReporteVentas 
} = require('../controller/ventas.controller');

router.post('/registrar', registrarVenta);
router.get('/reporte', obtenerReporteVentas);

module.exports = router;
