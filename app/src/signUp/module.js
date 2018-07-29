'use strict';

var SignUpController = require('./signUpController');
var SignUpService = require('./signUpService');

angular.module('IWorker.signUp', [])
    .controller('SignUpController', SignUpController)
    .service('SignUpService', SignUpService);