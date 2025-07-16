const express = require("express");
const router = express.Router();
const {
    asignarArtistaEvento,
    obtenerArtistasEvento,
    asignarArtistaGrupo,
    obtenerMiembrosGrupo
} = require('../controller/relaciones.controller');

// Relaciones artista-evento
router.post('/artista-evento', asignarArtistaEvento);
router.get('/evento/:eventoId/artistas', obtenerArtistasEvento);

// Relaciones artista-grupo
router.post('/artista-grupo', asignarArtistaGrupo);
router.get('/grupo/:grupoId/miembros', obtenerMiembrosGrupo);

module.exports = router;