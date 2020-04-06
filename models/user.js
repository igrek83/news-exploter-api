const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const LoginFailedError = require('../libs/loginFailedError');
const {
  emailMessageError,
  emailDoubleError,
  emailOrPassError,
} = require('../libs/errors-message');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: emailMessageError,
  }),
];

const userSchema = new mongoose.Schema({
  // имя
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // email
  email: {
    type: String,
    unique: true,
    required: true,
    // регистр
    uniqueCaseInsensitive: true,
    validate: emailValidator,
  },
  // пароль
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.plugin(uniqueValidator, { message: emailDoubleError });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new LoginFailedError(emailOrPassError));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new LoginFailedError(emailOrPassError));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
