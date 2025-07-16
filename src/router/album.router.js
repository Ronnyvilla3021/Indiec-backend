const express = require("express");
const router = express.Router();
const { 
    obtenerAlbumes, 
    crearAlbum 
} = require('../controller/album.controller');

router.get('/lista', obtenerAlbumes);
router.post('/crear', crearAlbum);

module.exports = router;