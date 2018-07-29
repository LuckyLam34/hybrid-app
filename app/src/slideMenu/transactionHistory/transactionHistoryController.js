'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:TransactionHistoryController
 * @description
 * # TransactionHistoryController
 */
module.exports = [
    '$scope',
    '$http',
    '$state',
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'TransactionHistoryService',
    'LocalStorageService',
    '$ionicHistory',

    function ($scope, $http, $state, apiPaths, apiHeaders, apiWrapper, TransactionHistoryService, LocalStorageService, $ionicHistory) {
        var self = this;

        self.goBack = function () {
            $ionicHistory.goBack();
        }

        self.userProfile = $state.params.object;
        
        var getTransHistory = function() {
            var userId = LocalStorageService.getUserData().userId;

            TransactionHistoryService.getTransactionHistory(userId).then(function(res) {
                self.infoRecords = res;
            });
        }

        var init = function() {
            getTransHistory();
        }

        init();
    }
];
