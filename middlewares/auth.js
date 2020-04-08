const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const LoginFailedError = require('../libs/loginFailedError');
const { authError } = require('../libs/errors-message');

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new LoginFailedError(authError);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginFailedError(authError);
  }

  req.user = payload;

  next();
};
