module.exports.corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://igrek83.github.io/news-explorer-frontend/',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};
