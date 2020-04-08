const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../libs/errors-message');
Joi.objectId = require('joi-objectid')(Joi);

const {
  registrationNameError,
  registrationEmailError,
  registrationPassError,
  incorrectEmailOrPassError,
  notKeyworldError,
  notTitleError,
  notTextErorr,
  notDateErorr,
  notSourceErorr,
  notLinkErorr,
  notImageErorr,
  notArticleIdError,
} = require('../libs/errors-message');

// регистрация юзера
const signupRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .error(new BadRequestError(registrationNameError)),
    email: Joi.string()
      .required()
      .email()
      .error(new BadRequestError(registrationEmailError)),
    password: Joi.string()
      .required()
      .min(8)
      .error(new BadRequestError(registrationPassError)),
  }),
});

// вход юзера
const loginRequestCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .error(new BadRequestError(incorrectEmailOrPassError)),
    password: Joi.string()
      .required()
      .min(8)
      .error(new BadRequestError(incorrectEmailOrPassError)),
  }),
});

// создание статьи
const articleRequestCheck = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().error(new BadRequestError(notKeyworldError)),
    title: Joi.string().required().error(new BadRequestError(notTitleError)),
    text: Joi.string().required().error(new BadRequestError(notTextErorr)),
    date: Joi.string().required().error(new BadRequestError(notDateErorr)),
    source: Joi.string().required().error(new BadRequestError(notSourceErorr)),
    link: Joi.string().required().uri().error(new BadRequestError(notLinkErorr)),
    image: Joi.string().required().uri().error(new BadRequestError(notImageErorr)),
  }),
});

// удаление статьи
const articleIdRequestCheck = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId()
      .required()
      .error(new BadRequestError(notArticleIdError)),
  }),
});

module.exports = {
  signupRequestCheck,
  loginRequestCheck,
  articleRequestCheck,
  articleIdRequestCheck,
};
