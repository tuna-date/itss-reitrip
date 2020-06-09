import { User } from '../../models/index';
import constants from '../../helpers/constants';
import errors from '../../helpers/errors';

export async function getUser(payload) {
  const user = await User.findByPk(payload.id);
  if (!user) throw new Error(errors.USER_NOT_FOUND);

  const response = user.toJSON();
  delete response.password;

  return response;
}

export async function getListUsers(payload) {
  const user = await User.findByPk(payload.currentUserId);
  if (user.role !== constants.userRole.ADMIN) throw new Error(errors.NOT_ADMIN);

  const users = await User.findAll({ attributes: ['id', 'username', 'email', 'avatar_url'] });
  return users;
}

export async function getCurrentUser(payload) {
  const user = await User.findByPk(payload.currentUserId);

  const response = user.toJSON();
  delete response.password;

  return response;
}
