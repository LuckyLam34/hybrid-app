'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:WorkCreatingService
 * @description
 * # WorkCreatingService
 */
module.exports = [
  'apiPaths',
  'apiWrapper',
  'CommonServices',

  function (apiPaths, apiWrapper, CommonServices) {

    var job = {
      "title": "",
      "address": "",
      "description": "",
      "startDate": "",
      "endDate": "",
      "startTime": "",
      "endTime": "",
      "contactName": "",
      "contactPhone": "",
      "payment": "",
      "earningPerDay": null,
      "numberOfMales": null,
      "numberOfFemales": null,
      "numberOfEmployees": null
    };

    var currentJob = {};

    var init = function () {
      currentJob = angular.copy(job);
      currentJob.contactName = CommonServices.userProfile.firstname;
      currentJob.contactPhone = CommonServices.userProfile.phone;
      getUserPlaces();
      return currentJob;
    }

    var getJob = function () {
      return currentJob;
    }

    var setJob = function (job) {
      job.startDate = new Date(job.startDate);
      job.endDate = new Date(job.endDate);
      job.startTime = new Date(job.startTime);
      job.endTime = new Date(job.endTime);
      getUserPlaces();
      currentJob = job;
    }

    var createJob = function () {
      delete currentJob.places;
      delete currentJob.status;
      currentJob.startDate = new Date(currentJob.startDate);
      currentJob.endDate = new Date(currentJob.endDate);
      currentJob.startTime = new Date(currentJob.startTime);
      currentJob.endTime = new Date(currentJob.endTime);
      console.log(currentJob);
      var url = apiPaths.SERVICE_METHODS.CREATE_JOB.path;
      var method = apiPaths.SERVICE_METHODS.CREATE_JOB.method;
      apiWrapper.callService(url, method, currentJob).then(function (data) {
        console.log(data);
      }, function (err) {
        console.log('err: ' + err);
      });
    };

    var updateJob = function () {
      delete currentJob.places;
      delete currentJob.status;
      currentJob.startDate = new Date(currentJob.startDate);
      currentJob.endDate = new Date(currentJob.endDate);
      currentJob.startTime = new Date(currentJob.startTime);
      currentJob.endTime = new Date(currentJob.endTime);
      console.log(currentJob);
      var url = apiPaths.SERVICE_METHODS.UPDATE_JOB.path;
      var method = apiPaths.SERVICE_METHODS.UPDATE_JOB.method;
      apiWrapper.callService(url + currentJob.id, method, currentJob).then(function (data) {
        console.log(data);
      }, function (err) {
        console.log('err: ' + err);
      });
    };

    var saveLocation = function (place) {
      var url = apiPaths.SERVICE_METHODS.CREATE_PLACE.path;
      var method = apiPaths.SERVICE_METHODS.CREATE_PLACE.method;
      apiWrapper.callService(url, method, place).then(function (data) {
        console.log(data);
      }, function (err) {
        console.log('err: ' + err);
      });
    };

    var getUserPlaces = function () {
      var urlPlaces = apiPaths.SERVICE_METHODS.GET_PLACES.path;
      var methodPlaces = apiPaths.SERVICE_METHODS.GET_PLACES.method;
      apiWrapper.callService(urlPlaces, methodPlaces, {}).then(function (data) {
        console.log(data);
        currentJob.places = data;
      }, function (err) {
        console.log('err: ' + err);
      });
    }



    var getWorkType = function () {
      var data = {
        type1: 'Phục vụ quán',
        type2: 'Giúp việc gia đình',
        type3: 'Vệ sinh máy lạnh',
        type4: 'Công nhân lao động',
      };
      return data;
    };

    return {
      init: init,
      getJob: getJob,
      setJob: setJob,
      getWorkType: getWorkType,
      createJob: createJob,
      updateJob: updateJob,
      saveLocation: saveLocation

    }
  }
];
