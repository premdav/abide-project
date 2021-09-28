require('dotenv').config();
const mongoose = require('mongoose');

async function dbConnect() {
  try {
    db = await mongoose.connect(process.env.MONGO_URL);
  } catch (e) {
    return e;
  }
  return db;
}

module.exports = dbConnect;
