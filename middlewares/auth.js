const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const LoginFailedError = require('../libs/loginFailedError');
const { authError } = require('../libs/errors-message');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginFailedError(authError);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginFailedError(authError);
  }

  req.user = payload;

  next();
};
