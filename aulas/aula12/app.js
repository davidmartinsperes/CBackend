const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apidocsRouter = require('./routes/apidocs');
const tarefasRouter = require('./routes/tarefaRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apidocsRouter);
app.use('/tarefas', tarefasRouter);

module.exports = app;
