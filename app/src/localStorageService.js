'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:LocalStorageService
 * @description
 * # LocalStorageService
 */

module.exports = [
    '$localStorage',
    
    function ($localStorage) {

        var setAccessToken = function(accessToken) {
            $localStorage.accessToken = JSON.stringify(accessToken);
        }

        var getAccessToken = function(){
            return JSON.parse($localStorage.accessToken);
        }

        var setUserData = function(data) {
            $localStorage.userData = JSON.stringify(data);
        }

        var getUserData = function() {
            return JSON.parse($localStorage.userData);
        }

        return {
            setAccessToken: setAccessToken,
            getAccessToken: getAccessToken,
            setUserData: setUserData,
            getUserData: getUserData
        }
    }
];