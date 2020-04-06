const article = require('../models/article');
const NotFoundError = require('../libs/notFoundError');
const NotPermissionError = require('../libs/notPermissionError');
const {
  articlesNotExistError,
  articleNotExistError,
  noRightsArticleDelError,
} = require('../libs/errors-message');

const getArticles = (req, res, next) => {
  article.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError(articlesNotExistError);
    })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  article.findOne({ _id: articleId })
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError(articleNotExistError);
    })
    .then((articleInfo) => {
      if (!articleInfo.owner.equals(req.user._id)) {
        throw new NotPermissionError(noRightsArticleDelError);
      }
      article.findByIdAndRemove(articleId)
        .then((article) => res.status(200).send({ data: article }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
