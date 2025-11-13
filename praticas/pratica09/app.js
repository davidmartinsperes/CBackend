const express = require('express');
const logger = require('morgan');

const produtosRouter = require('./routes/produtos');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/produtos', produtosRouter);
app.use('/api-docs', apidocsRouter);

app.use((req, res) => {
  res.status(404).json({ msg: 'Not Found' });
});

module.exports = app;