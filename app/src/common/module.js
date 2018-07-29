'use strict';

var SearchBarController = require('./searchbar/searchBarController');
var searchbar = require('./searchbar/searchbar');
var formatFn = require('./filters/formatFn');
var filterStatusFn = require('./filters/statusTranslate');

angular.module('IWorker.directives', [])
        .controller('SearchBarController', SearchBarController)
        .directive('searchBar', searchbar)
        .directive('format', ['$filter', formatFn])
        .filter('status', [filterStatusFn]);