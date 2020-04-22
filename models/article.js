const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const { emailMessageError } = require('../libs/errors-message');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: emailMessageError,
  }),
];

const articleSchema = new mongoose.Schema(
  {
    // ключевое слово для нахож. статьи
    keyword: {
      type: String,
      required: true,
    },
    // заголовок
    title: {
      type: String,
      required: true,
    },
    // текст статьи
    text: {
      type: String,
      required: true,
    },
    // дата статьи
    date: {
      type: String,
      required: true,
    },
    // источник статьи
    source: {
      type: String,
      required: true,
    },
    // ссылка на статью. url
    link: {
      type: String,
      required: true,
      validate: urlValidator,
    },
    // изображение к статье. url
    image: {
      type: String,
      required: true,
      validate: urlValidator,
    },
    // id юзера, сохранившего статью
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('article', articleSchema);
