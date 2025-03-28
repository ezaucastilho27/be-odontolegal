const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importe a configuração do seu banco de dados

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_desejado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    endereco: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_aprovacao: {
      type: DataTypes.ENUM('pendente', 'aprovado', 'rejeitado'),
      defaultValue: 'pendente'
    },
    tipo_usuario: {
      type: DataTypes.ENUM('admin', 'funcionario'),
      allowNull: false
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    atualizado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: false // Defina como false se você não quiser os campos createdAt/updatedAt
  }
);

module.exports = Usuario;
