'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:apiHeaders
 * @description
 * # apiHeaders
 */
module.exports = [
  function () {
      var headers = {
        "Content-Type": "application/json",
        "Authorization": "",
      }
      var setAuthorization = function(key) {
            headers.Authorization = key;
        }

        var getHeaders = function(){
            return headers;
        }
    return {
      setAuthorization: setAuthorization,
      getHeaders: getHeaders
    };
  }
];
