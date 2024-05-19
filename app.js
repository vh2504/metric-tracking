const express = require('express');
const { customResponse } = require('./base/customResponse');
const router = require('./routes/index')
const app = express();

app.use(express.json());
app.use(customResponse)

app.get('/', function(req, res) {
  res.send('app running...')
})

app.use(router)
module.exports = app;
