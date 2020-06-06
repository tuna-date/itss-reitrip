import { User } from '../../models/index';

export async function getUser(id) {
  try {
    const user = await User.findByPk(id);

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
