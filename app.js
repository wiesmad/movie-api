const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const dotenv = require('dotenv').config();
const routes = require('./routes/routes');

app.set('view engine', 'html');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', routes);
app.use('*', (req, res) => {
  res.render('404', {
    error: `Requested url: '${req.originalUrl}' does not exist!`,
  });
});

app.listen(3000, () => console.log('running'));
