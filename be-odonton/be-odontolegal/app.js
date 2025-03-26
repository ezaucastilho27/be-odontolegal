const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Importa a configuração do banco
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Configuração do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Conexão com o MongoDB
connectDB(); // Conecta ao banco

// Rotas
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema BE-Odontolegal!');
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
