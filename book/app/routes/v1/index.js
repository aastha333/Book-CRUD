const app = require('express')();

app.use('/book', require('./book'));

module.exports = app;
