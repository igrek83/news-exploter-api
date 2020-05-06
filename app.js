const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');


const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limited } = require('./middlewares/express-rate-limit');

const { PORT, MONGO_IP } = require('./config/config.js');

const router = require('./routes/router');
const handlerError = require('./middlewares/handlerError');

const app = express();

mongoose.connect(MONGO_IP, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


// заголовки безопасности
app.use(helmet());
// защита от DDos
app.use(limited);

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);
// app.use(cookieParser());
app.use(router);
// логгер ошибок. Подключается после всех обработчиков роутов
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT);
});
