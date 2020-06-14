import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/index';
import constants from '../../helpers/constants';
import errors from '../../helpers/errors';

async function getUserByEmail(email) {
  return User.findOne({
    where: {
      email,
    },
  });
}

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

export async function register(payload) {
  let user = await getUserByEmail(payload.email);
  if (user) throw new Error(errors.EMAIL_WAS_REGISTED);
  const hashPassword = await bcrypt.hash(payload.password, constants.SALT_ROUNDS);

  user = User.build({
    username: payload.username,
    email: payload.email,
    password: hashPassword,
  });
  await user.save();

  const response = user.toJSON();
  delete response.password;

  return response;
}

export async function login(payload) {
  const user = await getUserByEmail(payload.email);
  if (!user) throw new Error(errors.USER_NOT_FOUND);

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) throw new Error(errors.EMAIL_PASS_NOT_MATCH);

  const token = generateAccessToken({ id: user.id });
  const response = {
    username: user.username,
    email: user.email,
    token,
  };

  return response;
}

export async function adminLogin(payload) {
  const user = await getUserByEmail(payload.email);
  if (!user) throw new Error(errors.USER_NOT_FOUND);

  if (user.role !== constants.userRole.ADMIN) throw new Error(errors.ADMIN_NOT_FOUND);

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) throw new Error(errors.EMAIL_PASS_NOT_MATCH);

  const token = generateAccessToken({ id: user.id });
  const response = {
    email: user.email,
    token,
  };

  return response;
}

export default register;
