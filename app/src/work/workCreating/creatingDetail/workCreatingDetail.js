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

    self.setCustomEmployer = function (checked) {
      if (checked) {
        self.job.numberOfEmployees = 0;
      } else {
        self.job.numberOfMales = 0;
        self.job.numberOfFemales = 0;
      }
    }

    self.goCreatingInfo = function (form) {
      form.$submitted = true;
      if (form.$valid) {
        if (self.job.numberOfMales || self.job.numberOfFemales) {
          self.job.numberOfEmployees = self.job.numberOfMales + self.job.numberOfFemales;
          $state.go('work.workCreatingInfo');
        } else if (!self.job.numberOfEmployees) {
          form.$invalid = true;
        } else {
          self.job.numberOfMales = '';
          self.job.numberOfFemales = '';
          $state.go('work.workCreatingInfo');
        }
      }
    }

  }
];
