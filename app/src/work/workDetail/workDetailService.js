'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:WorkDetailService
 * @description
 * # WorkDetailService
 */
module.exports = [
    '$http',
    '$q',

    function ($http, $q) {

        var SERVICE_URLs = {
           workDetail: 'data/workDetail.json'
        };

        var getWorkDetail = function (workId) {
            var deferred = $q.defer();
    
            $http({
                method: 'GET',
                url: SERVICE_URLs.workDetail
            }).then(function(result) {
                deferred.resolve(result.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            getWorkDetail: getWorkDetail,
        }
    }
];