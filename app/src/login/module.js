'use strict';

var LoginController     = require('./loginController');
var LoginService        = require('./loginService');

angular.module('IWorker.login', [
] )
.controller('LoginController', LoginController)
.service('LoginService', LoginService);