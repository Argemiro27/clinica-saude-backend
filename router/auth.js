// routes/auth.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota para registrar usuário
router.post('/save-usuario', AuthController.registerUsuario);

router.post('/login', AuthController.login);

module.exports = router;
