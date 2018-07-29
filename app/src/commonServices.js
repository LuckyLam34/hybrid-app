'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:CommonServices
 * @description
 * # CommonServices
 */
module.exports = [
    '$http',
    '$q',
    'ConfigurationService',

    function ($http, $q, ConfigurationService) {
        var SERVICE_URLs = {
            users: 'data/users.json',
            options: 'data/options.json'
        };

        var userProfile = {};
        var userPlaces = [];

        var getUserOptions = function () {
            var deferred = $q.defer();
    
            $http({
                method: 'GET',
                url: SERVICE_URLs.options
            }).then(function(result) {
                deferred.resolve(result.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return {
            userProfile: userProfile,
            userPlaces: userPlaces,
            getUserOptions: getUserOptions
        };
    }
];