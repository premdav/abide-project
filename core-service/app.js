const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const PORT = 8000;

mongoose.connect(config.mongo_url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB');
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, PUT,OPTIONS, DELETE, GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    res.end();
  } else {
    next();
  }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));