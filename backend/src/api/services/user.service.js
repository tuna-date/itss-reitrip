import { User } from '../../models/index';
import errors from '../../helpers/errors';

export async function getUser(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error(errors.USER_NOT_FOUND);

    const response = user.toJSON();
    delete response.password;

    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUsers() {
  // TODO
}
