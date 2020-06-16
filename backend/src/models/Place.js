import { DataTypes } from 'sequelize';
import constants from '../helpers/constants';

export const placeFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  services: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: constants.registedPlaceStatus.PENDING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default placeFields;
