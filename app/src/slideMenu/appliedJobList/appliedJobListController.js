'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:AppliedJobListController
 * @description
 * # AppliedJobListController
 */
module.exports = [
    '$scope',
    '$http',
    '$state',
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'AppliedJobListService',
    'LocalStorageService',
    '$ionicHistory',

    function ($scope, $http, $state, apiPaths, apiHeaders, apiWrapper, AppliedJobListService, LocalStorageService, $ionicHistory) {
        var self = this;

        self.goBack = function () {
            $ionicHistory.goBack();
        }

        var getAppliedJobs = function() {
            AppliedJobListService.getAppliedJobs().then(function(result) {
                self.appliedJobs = result;
            });
        };

        var init = function() {
            getAppliedJobs();
        }
        
        init();
    }
];
