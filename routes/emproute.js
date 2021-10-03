const express = require('express');

const employeeRoute = require('./employees')

const emproute = express.Router();

module.exports = params => {

    emproute.use('/employees',employeeRoute(params));

  return emproute;
};
