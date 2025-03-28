const { Usuario } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, usuario_desejado, cpf, endereco } = req.body;

    // Cria um novo usuário com status "pendente"
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha, // Criptografar a senha antes
      usuario_desejado,
      cpf,
      endereco,
      status_aprovacao: 'pendente'
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso. Aguardando aprovação do administrador.', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
};
