const authorization = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signupRequestCheck, loginRequestCheck } = require('../middlewares/validation');

authorization.post('/signup', signupRequestCheck, createUser);
authorization.post('/signin', loginRequestCheck, login);

module.exports = authorization;
