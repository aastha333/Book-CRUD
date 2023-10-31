const app = require('express')();

app.use('/', require('./book'));

module.exports = app;
