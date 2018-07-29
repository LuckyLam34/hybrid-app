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
    
    self.goCreatingConfirm = function(form){
      form.$submitted = true;
      if (form.$valid) {
        console.log(self.job);
        $state.go('work.workCreatingConfirm');
      }
    }
  }
];
