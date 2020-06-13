import { DataTypes } from 'sequelize';
import constants from '../helpers/constants';

export const placeFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  services: {
    type: DataTypes.STRING,
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
