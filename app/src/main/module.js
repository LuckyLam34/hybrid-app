'use strict';

var MainController = require('./mainController');

var LoginService = require('../login/loginService');

angular.module('IWorker.main', [] )
.controller('MainController', MainController)
.service('LoginService', LoginService);
