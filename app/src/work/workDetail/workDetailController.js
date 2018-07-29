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
  'apiPaths',
  'apiHeaders',
  'apiWrapper',
  '$ionicPopup',
  '$rootScope',

  function ($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, WorkCreatingService, $ionicHistory, CommonServices, apiPaths, apiHeaders, apiWrapper, $ionicPopup, $rootScope) {

    var self = this;
    self.isAppliedJob = false;

    $scope.$on('$ionicView.beforeEnter', function () {
      self.job = $state.params.object;

      var url = apiPaths.SERVICE_METHODS.CHECK_APPLIED_JOB.path;
      var method = apiPaths.SERVICE_METHODS.CHECK_APPLIED_JOB.method;
      var request = {
        "jobId": self.job.id
      };
      apiWrapper.callService(url, method, request).then(function (data) {
        self.isAppliedJob = data.isApplied;
      }, function (err) {
        console.log('err: ' + err);
      });
    });

    self.goBack = function () {
      $ionicHistory.goBack();
    }

    self.applyJob = function (jobId) {
      var url = apiPaths.SERVICE_METHODS.APPLY_JOB.path;
      var method = apiPaths.SERVICE_METHODS.APPLY_JOB.method;
      var request = {
        "jobId": jobId
      };
      apiWrapper.callService(url, method, request).then(function (data) {
        $ionicPopup.alert({
          // title: 'Don\'t eat that!',
          template: 'Bạn đã ứng tuyển thành công'
        });
        self.isAppliedJob = true;
      }, function (err) {
        console.log('err: ' + err);
      });
    }
  }
];
