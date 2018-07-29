'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:TransactionHistoryService
 * @description
 * # TransactionHistoryService
 */
module.exports = [
    "$http",
    "$q",
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',
    
    function($http, $q, apiPaths, apiHeaders, apiWrapper, LocalStorageService ) {
    
        var getTransactionHistory = function(userId) {
            
            var url = 'Workers/' + userId + '/workerTransactions';
            var method = 'GET';

            return apiWrapper.callService(url, method, '');
        }

        return {
            getTransactionHistory: getTransactionHistory
        }
    }
];