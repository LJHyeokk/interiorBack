import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const realAuthentication = (req, res, next) => {
  const token = req.headers.token;

  const validToken = verifyToken(token);
  if (validToken) {
    req.body.user_id = validToken.id;
    next();
  } else {
    res.status(400).send('INVAILD TOKEN');
    return;
  }
};

const authentication = (req, res, next) => {
  const token = req.headers.token;

  const validToken = verifyToken(token);
  if (validToken) {
    req.body.user_id = validToken.id;
    next();
  } else {
    next();
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_TOKEN_KEY);
  } catch (err) {
    return null;
  }
};

export { authentication, realAuthentication };
