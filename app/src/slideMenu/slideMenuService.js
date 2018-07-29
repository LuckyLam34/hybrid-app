'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:SlideMenuService
 * @description
 * # SlideMenuService
 */
module.exports = [
    "$http",
    "$q",
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',
    
    function($http, $q, apiPaths, apiHeaders, apiWrapper, LocalStorageService ) {
        
        var uploadAvatar = function(base64ImageData) {
            
            var url = apiPaths.SERVICE_METHODS.UP_AVATAR.path;
            var method = apiPaths.SERVICE_METHODS.UP_AVATAR.method;
            var data = {'avatar': base64ImageData}

            var deferred = $q.defer();

            apiWrapper.callService(url, method, data).then(function(data) {
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(data);
            });

            return deferred.promise;
        }

        return {
            uploadAvatar: uploadAvatar
        }
    }
];