'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:apiWrapper
 * @description
 * # apiWrapper
 */
module.exports = [
  '$http',
  '$q',
  'apiPaths',
  'apiHeaders',
  '$ionicLoading',

  function ($http, $q, apiPaths, apiHeaders, $ionicLoading) {
    var callService = function (url, method, data) {
      console.log(apiPaths.URL + url);
      var deferred = $q.defer();

      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
      });

      $http({
        method: method,
        url: apiPaths.URL + url,
        headers: apiHeaders.getHeaders(),
        data: data,
        dataType: 'json',
      }).then(function (result) {
          $ionicLoading.hide();
          deferred.resolve(result.data);
      }, function (error) {
          $ionicLoading.hide();
          deferred.reject(error);
        console.log(error);
      });
      return deferred.promise;
    };

    return {
      callService: callService
    };
  }
];
