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
      if($state.params.status!="update"){
        self.job = WorkCreatingService.init();
        self.job.status = "create"
      }else{
        self.job = WorkCreatingService.getJob();
        self.job.status = "update"
      }
    });

    self.workTypes = WorkCreatingService.getWorkType();

    self.showWorkType = function(index){
      return index % 2 ? "squarebutton-right" : "squarebutton-left";
    }

    self.goCreatingDetail = function (workType) {
      self.job.title = workType;
      $state.go('work.workCreatingDetail');
    }

    self.workList = function () {
      $state.go('work.workList');
    }
  }
];
