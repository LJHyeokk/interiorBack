import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { getUserByEmail } from '../models/userDao';

const signInService = async (email, password) => {
  const [user] = await getUserByEmail(email);
  let isSame;
  let error;

  if (user) {
    if (password === user.password) {
      isSame = true;
    }
  } else if (!user) {
    error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  if (!isSame) {
    error = new Error('INVALID_PW');
    error.statusCode = 400;

    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN_KEY, {
    expiresIn: '120m',
  });

  return token;
};

export { signInService };
