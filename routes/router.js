const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const authorization = require('./authorization');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../libs/notFoundError');
const { notFoundUrlError } = require('../libs/errors-message');

router.use(authorization);

router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundUrlError));
});

module.exports = router;
