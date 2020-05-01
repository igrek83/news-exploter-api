module.exports.corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://github.com/igrek83/news-explorer-frontend',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};
