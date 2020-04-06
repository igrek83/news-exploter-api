require('dotenv').config();

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: isProductionMode ? process.env.JWT_SECRET : 'dev-secret',
  MONGO_IP: 'mongodb://localhost:27017/mestodb',
};
