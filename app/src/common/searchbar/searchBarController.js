'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:SearchBarController
 * @description
 * # SearchBarController
 */
module.exports = [
  '$state',
  '$scope',
  'apiPaths',
  'apiHeaders',
  'apiWrapper',
  'LocalStorageService',
  'WorkListService',
  'PubSub',
  '$timeout',

  function ($state, $scope, apiPaths, apiHeaders, apiWrapper, LocalStorageService, WorkListService, PubSub, $timeout) {

    $scope.fromDate = '';
    $scope.toDate = '';
    $scope.filterByDate = '';
    $scope.query = '';

    var convertToTimeStamp = function (stringDate) {
      // var myDate = stringDate.split("-");
      // myDate = stringDate.split("/");

      // var newDateTimeStamp = myDate[1] + "/" + myDate[0] + "/" + myDate[2];

      return new Date(stringDate).getTime();
    };

    $scope.show = false;
    $scope.showCheckbox = false;
    $scope.showToggle = false;

    $scope.showIt = function() {
      $scope.showToggle = true;
    }

    $scope.hideIt = function() {
      $scope.showCheckbox = false;
      $scope.show = false;
    }

    $scope.a = true;

    $scope.goDetail = function (detailData) {
      $state.go('work.workDetail', {object: detailData});
    }


    $scope.cancel = function() {
      $scope.query = '';
      $scope.showList = false;
      $scope.moreData = true;
      
      if (document.getElementById('fromDate')) {
         document.getElementById('fromDate').value = '';
      }

      if (document.getElementById('toDate')) {
        document.getElementById('toDate').value = '';
      }

      PubSub.publish($scope.PubSubService.JobsFilterResults, 'canceled');
    };

    var skip = 0;

    $scope.moreData = true;

    $scope.loadMore = function() {
      
      console.log('more data:' + $scope.moreData);
      var fromDate = '', toDate = '';

      if (document.getElementById('fromDate')) {
        fromDate = (document.getElementById('fromDate').value).toString();
      }

      if (document.getElementById('toDate')) {
        toDate = (document.getElementById('toDate').value).toString();
      }
      
      var fromDateTimestamp, toDateTimestamp;

      if (!fromDate || !toDate) {
        toDateTimestamp = new Date().getTime();

        var priorDate = new Date(new Date().setDate(new Date().getDate() - 30));
        
        fromDateTimestamp = priorDate.getTime(); //get timestamp
      } else {
        fromDateTimestamp = convertToTimeStamp(fromDate);
        console.log(fromDateTimestamp);
        toDateTimestamp = convertToTimeStamp(toDate);
      }

      $scope.numberOfFilteredJobs = '';

      skip += 5;

      console.log(skip);

      WorkListService.filterJobsOfEmployer($scope.query, fromDateTimestamp, toDateTimestamp, skip).then(function(data) {
  
          if (data.length > 0) {
              $scope.filteredWorkList = $scope.filteredWorkList.concat(data);
              
          } else {
            console.log('nomore data');
            skip = 0;
            $scope.moreData = false;
          };

          $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(err) {
      });  
    };

    $scope.filterJobs = function (query, _fromDate, _toDate) {
      $timeout(function() {

        var fromDate = '', toDate = '';

        if (document.getElementById('fromDate')) {
          fromDate = (document.getElementById('fromDate').value).toString();
        }

        if (document.getElementById('toDate')) {
          toDate = (document.getElementById('toDate').value).toString();
        }
        
        var fromDateTimestamp, toDateTimestamp;

        if (!fromDate || !toDate) {
          toDateTimestamp = new Date().getTime();

          var priorDate = new Date(new Date().setDate(new Date().getDate() - 30));
         
          fromDateTimestamp = priorDate.getTime(); //get timestamp
        } else {
          fromDateTimestamp = convertToTimeStamp(fromDate);
          console.log(fromDateTimestamp);
          toDateTimestamp = convertToTimeStamp(toDate);
        }

        var pageIndex = '';
        var recordsPerPage = 5;

        $scope.numberOfFilteredJobs = '';

        WorkListService.filterJobsOfEmployer(query, fromDateTimestamp, toDateTimestamp, 0).then(function(data) {
            if (data) {
                // $scope.workList = data;
                $scope.showList = true;
                $scope.numberOfFilteredJobs = data.length;
                $scope.filteredWorkList = data;
                PubSub.publish($scope.PubSubService.JobsFilterResults, 'filteredJobListAvai');
                // console.log(data);
            };
        }, function(err) {
        });
      }, 1000);    
    }

    var countJobsOfEmployer = function() {
        WorkListService.countJobsOfEmployer().then(function(numberOfJobs) {
            $scope.totalJobs = numberOfJobs;
            var recordsPerPage = 5;

            $scope.numberOfPages = ($scope.totalJobs.count / recordsPerPage) > parseInt($scope.totalJobs.count / recordsPerPage) ? parseInt($scope.totalJobs.count / recordsPerPage) + 1 : parseInt($scope.totalJobs.count / recordsPerPage); //13/5 => 2 pages
        }, function(err){});
    }

    // countJobsOfEmployer();
  }
];