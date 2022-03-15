import { DataTypes, Model } from 'sequelize';
import { UserRecord } from '../types';
import sequelize from '../database';

interface UserInstance extends Model<UserRecord>, UserRecord {
}
export const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user',
  underscored: true,
  timestamps: false,
});
