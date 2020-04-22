const { serverMessageError, emailDoubleError } = require('../libs/errors-message');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = serverMessageError } = err;

  if (err.name === 'ValidationError') {
    statusCode = 409;
    message = emailDoubleError;
  }
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;


