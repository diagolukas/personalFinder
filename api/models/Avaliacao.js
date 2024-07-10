import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Cliente } from './Cliente.js';
import { Personal } from './Personal.js'

export const Avaliacao = sequelize.define('avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: DataTypes.STRING(255),
  },
  estrelas: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  },
  data: {
    type: DataTypes.DATE(),
    allowNull: false
  }
}, {
  tableName: "avaliacoes"
});

Avaliacao.belongsTo(Personal, {
  foreignKey: {
    name: 'personal_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Personal.hasMany(Avaliacao, {
  foreignKey: 'personal_id'
})

Avaliacao.belongsTo(Cliente, {
  foreignKey: {
    name: 'cliente_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Cliente.hasMany(Avaliacao, {
  foreignKey: 'cliente_id'
})