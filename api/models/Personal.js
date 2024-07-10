import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Personal = sequelize.define('personal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cref: {
    type: DataTypes.STRING(6),
    allowNull: false,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  treino: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  local: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
}, {
  paranoid: true
});