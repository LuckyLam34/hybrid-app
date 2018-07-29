'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:WorkListService
 * @description
 * # WorkListService
 */
module.exports = [
    "$http",
    "$q",
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',
    
    function($http, $q, apiPaths, apiHeaders, apiWrapper, LocalStorageService ) {
        var filterJobsOfEmployer = function(query, fromDate, toDate, skip) {
            var url = apiPaths.SERVICE_METHODS.FILTER_WORKER_JOBS.path;
            var method = apiPaths.SERVICE_METHODS.FILTER_WORKER_JOBS.method;

            var skip = skip || 0;

            var _url = url + '?filter=' + '{"where":{"or": [{"title":{"like": ".*' + query + '.*","options":"i"}},{"description":{"like": ".*' + query + '.*","options":"i"}},{"address":{"like": ".*' + query + '.*","options":"i"}}],"and":[{"createDate":{"between":[' + fromDate + ',' + toDate +']}}]},"limit":5, "skip":' + skip + '}';

            return apiWrapper.callService(_url, method, '');
        }

        var countJobsOfEmployer = function() {
            var url = apiPaths.SERVICE_METHODS.COUNT_WORKER_JOBS.path;
            var method = apiPaths.SERVICE_METHODS.COUNT_WORKER_JOBS.method;

            return apiWrapper.callService(url, method, '');
        }

        return {
            filterJobsOfEmployer: filterJobsOfEmployer,
            countJobsOfEmployer: countJobsOfEmployer
        }
    }
];