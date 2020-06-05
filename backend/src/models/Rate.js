import { DataTypes } from 'sequelize';

export const rateFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  place_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default rateFields;
