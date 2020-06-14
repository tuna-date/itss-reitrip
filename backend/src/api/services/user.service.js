import { User } from '../../models/index';
import constants from '../../helpers/constants';
import errors from '../../helpers/errors';

async function adminChecker(currentUserId) {
  const user = await User.findByPk(currentUserId);

  if (user.role !== constants.userRole.ADMIN) throw new Error(errors.NOT_ADMIN);
}

export async function getUser(payload) {
  const user = await User.findByPk(payload.id);
  if (!user) throw new Error(errors.USER_NOT_FOUND);

  const response = user.toJSON();
  delete response.password;

  return response;
}

export async function updateUserInfo(payload) {
  const currentUser = await User.findByPk(payload.currentUserId);

  currentUser.username = payload.username;
  currentUser.avatar_url = payload.avatar_url;

  currentUser.save();

  return currentUser;
}

export async function removeUser(payload) {
  await adminChecker(payload.currentUserId);

  const user = await User.findByPk(payload.user_id);
  user.destroy();

  return { status: 'Record deleted' };
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
