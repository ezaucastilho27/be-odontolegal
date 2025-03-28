const express = require('express');
const bodyParser = require('body-parser'); // Não esqueça de importar o body-parser
const sequelize = require('../config/database'); // Certifique-se que o caminho está correto
const adminRoutes = require('./routes/adminRoutes');
const registerRoutes = require('./routes/registerRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Configuração do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Conectar ao banco de dados com o Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// Rotas
app.use('/api/admin', adminRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/usuario', usuarioRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema BE-Odontolegal!');
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
