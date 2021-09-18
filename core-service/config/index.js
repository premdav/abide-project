require('dotenv').config();

const config = {
  mongo_url: process.env.MONGO_URL,
  port: process.env.PORT,
};

module.exports = config;
