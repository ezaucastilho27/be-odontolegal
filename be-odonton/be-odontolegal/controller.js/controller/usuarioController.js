const bcrypt = require('bcryptjs'); // Para criptografar a senha
const { Usuario } = require('../models'); // Importa o modelo de usuário

// Registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, usuario_desejado, cpf, endereco } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!nome || !email || !senha || !usuario_desejado || !cpf || !endereco) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    // Verifica se já existe um usuário com o mesmo email ou CPF
    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }]
      }
    });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Já existe um usuário com este email ou CPF.' });
    }

    // Criptografa a senha antes de salvar no banco de dados
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria um novo usuário com status "pendente"
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      usuario_desejado,
      cpf,
      endereco,
      status_aprovacao: 'pendente' // Usuário será aprovado pelo admin
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso. Aguardando aprovação do administrador.',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        status_aprovacao: novoUsuario.status_aprovacao,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
};
