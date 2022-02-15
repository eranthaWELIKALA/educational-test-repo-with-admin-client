require('dotenv').config();
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const keycloakConfig = require('./config/keycloak.config');
const errorHandlerService = require('./services/errorHandlerService');

var indexRouter = require('./routes/index');

var app = express();
keycloakConfig.initKeycloak(`${process.env.IAMSERVER_ADDR || 'http://localhost:8080'}/auth`, process.env.IAMSERVER_REALM_NAME || 'test-realm');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(errorHandlerService);

module.exports = app;
