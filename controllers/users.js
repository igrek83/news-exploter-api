const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');
const user = require('../models/user');

const NotFoundError = require('../libs/notFoundError');
const { userNotExistError } = require('../libs/errors-message');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => {
      const { password: pass, ...newUser } = user._doc;
      res.status(201).send(newUser);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(userNotExistError);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
