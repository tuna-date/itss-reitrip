import { DataTypes } from 'sequelize';

export const notificationObjectFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  notification_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default notificationObjectFields;
