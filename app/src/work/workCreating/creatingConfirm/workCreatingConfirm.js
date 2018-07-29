'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:ClientControler
 * @description
 * # ClientControler
 */
module.exports = [
  '$scope',
  '$state',
  '$cordovaGeolocation',
  '$ionicLoading',
  '$ionicPlatform',
  'WorkCreatingService',
  '$ionicHistory',
  'CommonServices',

  function ($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, WorkCreatingService, $ionicHistory, CommonServices) {

    var self = this;

    $scope.$on('$ionicView.beforeEnter', function () {
      self.job = WorkCreatingService.getJob();
    });

    self.goBack = function () {
      $ionicHistory.goBack();
    }

    self.createJob = function () {
      if(self.job.status != "update"){
        WorkCreatingService.createJob();
      } else{
        WorkCreatingService.updateJob();
      }
      console.log(self.job);
    };

  }
];
