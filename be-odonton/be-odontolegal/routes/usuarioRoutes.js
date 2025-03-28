const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificaAdmin } = require('../middlewares/auth');

// Rota para registrar novo usuário
router.post('/usuarios', usuarioController.registrarUsuario);

// Rotas específicas para administradores
router.get('/admin/usuarios-pendentes', verificaAdmin, usuarioController.listarPendentes);
router.patch('/admin/usuarios/:id', verificaAdmin, usuarioController.aprovarOuRejeitarUsuario);

module.exports = router;
