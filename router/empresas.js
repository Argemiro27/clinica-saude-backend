// routes/departamentos.js
const express = require('express');
const router = express.Router();
const EmpresasController = require('../controllers/EmpresasController');

// Rota para obter departamentos
router.get('/get_empresas', EmpresasController.getEmpresas);

module.exports = router;
