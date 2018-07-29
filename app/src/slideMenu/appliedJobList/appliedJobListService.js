'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:AppliedJobListService
 * @description
 * # AppliedJobListService
 */
module.exports = [
    "$http",
    "$q",
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',
    
    function($http, $q, apiPaths, apiHeaders, apiWrapper, LocalStorageService ) {
    
        var getAppliedJobs = function() {
            
            var url = apiPaths.SERVICE_METHODS.GET_APPLIED_JOBS.path;
            var method = apiPaths.SERVICE_METHODS.GET_APPLIED_JOBS.method;

            return apiWrapper.callService(url, method, '');
        }

        return {
            getAppliedJobs: getAppliedJobs
        }
    }
];