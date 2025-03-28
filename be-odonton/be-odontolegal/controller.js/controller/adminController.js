exports.listarPendentes = async (req, res) => {
  try {
    const usuariosPendentes = await Usuario.findAll({ where: { status_aprovacao: 'pendente' } });
    res.status(200).json(usuariosPendentes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários pendentes.', error });
  }
};

exports.aprovarOuRejeitarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_aprovacao } = req.body; // 'aprovado' ou 'rejeitado'

    if (!['aprovado', 'rejeitado'].includes(status_aprovacao)) {
      return res.status(400).json({ message: 'Status inválido. Use "aprovado" ou "rejeitado".' });
    }

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    usuario.status_aprovacao = status_aprovacao;
    await usuario.save();

    res.status(200).json({ message: `Usuário ${status_aprovacao} com sucesso.` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status do usuário.', error });
  }
};
