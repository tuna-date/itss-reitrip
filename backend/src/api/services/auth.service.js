import { User } from '../../models/index';

export async function register(payload) {
  try {
    const user = User.build(payload);
    await user.save();

    const response = user.toJSON();
    delete response.password;

    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default register;
