// routes/cargos.js
const express = require('express');
const router = express.Router();
const CargosController = require('../controllers/CargosController');

// Rota para obter cargos
router.get('/get_cargos', CargosController.getCargos);

module.exports = router;
