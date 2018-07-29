'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:LoginService
 * @description
 * # LoginService
 */
module.exports = [
  function () {
    var getUserInfo = function () {

      var data = {
        username: 'abcd',
        password: '1234',
      };
      return data;
    }

    return {
      getUserInfo: getUserInfo,
    }
  }
];
