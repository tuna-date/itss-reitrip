import { DataTypes } from 'sequelize';

export const notificationChangeFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  notification_object_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default notificationChangeFields;
