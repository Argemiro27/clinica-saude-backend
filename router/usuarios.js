// routes/auth.js
const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

// Rota para registrar usuário
router.get('/get_usuarios', UsuariosController.getUsuarios);

// Rota para obter usuários pelo id de empresa
router.get('/get_usuarios_by_empresa/:id_empresa', UsuariosController.getUsuariosByEmpresa);

module.exports = router;
