const express = require('express');
const { register, listUsers } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

router.post('/register', authenticateToken, register);
router.get('/', authenticateToken, authorizeAdmin, listUsers);

module.exports = router;
