'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:WorkListController
 * @description
 * # WorkListController
 */
module.exports = [
'$scope',
'$state',
'apiPaths',
'apiWrapper',
'WorkListService',
'$ionicHistory',
'PubSub',

function ($scope, $state, apiPaths, apiWrapper, WorkListService, $ionicHistory, PubSub) {
  var self = this;

  self.query = '';
  self.showJobList = true;
  
  var init = function() {
    var url = apiPaths.SERVICE_METHODS.GET_JOBS.path;
    var method = apiPaths.SERVICE_METHODS.GET_JOBS.method;
    var request = {};
    apiWrapper.callService(url, method, request).then(function (data) {
      self.workList = data;
    }, function (err) {
      console.log('err: ' + err);
    });
  }

  self.goDetail = function (detailData) {
    console.log(detailData);
    $state.go('work.workDetail', {object: detailData});
  }

  var jobsFilterResults = PubSub.subscribe($scope.PubSubService.JobsFilterResults, function(value) {
    if (value === 'canceled') {
      init();
      self.showJobList = true;
    } else if (value === 'filteredJobListAvai') {
      self.showJobList = false; 
    }
  });

  init();

}];
