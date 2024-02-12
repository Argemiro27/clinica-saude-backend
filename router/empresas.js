const express = require('express');
const router = express.Router();
const EmpresasController = require('../controllers/EmpresasController');

// Rota para obter departamentos
router.get('/get_empresas', EmpresasController.getEmpresas);

// Rota para obter uma empresa por ID
router.get('/get_empresa_by_id/:id_empresa', EmpresasController.getEmpresaById);

module.exports = router;
