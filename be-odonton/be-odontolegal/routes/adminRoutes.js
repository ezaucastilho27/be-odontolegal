const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificaAutenticacao, verificaAdmin } = require('../middlewares/auth');

// Rota aberta para registro de usuários
router.post('/usuarios', usuarioController.registrarUsuario);

// Rotas protegidas
router.get('/admin/usuarios-pendentes', verificaAutenticacao, verificaAdmin, usuarioController.listarPendentes);
router.patch('/admin/usuarios/:id', verificaAutenticacao, verificaAdmin, usuarioController.aprovarOuRejeitarUsuario);

module.exports = router;
