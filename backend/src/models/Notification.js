import { DataTypes } from 'sequelize';

export const notificationFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  notification_object_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notifier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default notificationFields;
