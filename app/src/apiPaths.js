'use strict';

/**
 * @ngdoc function
 * @name IWorker.service:apiPaths
 * @description
 * # apiPaths
 */
module.exports = [
  function () {
    return {

      //development
    //   URL: "http://45.118.148.68:3000/api/",

      //testing
      //URL: "http://45.118.148.68:3001/api/",

      //production
      URL: "http://45.118.148.68:5228/api/",
      
      SERVICE_METHODS: {
          CREATE_WORKER : {
              path: 'Workers',
              method: 'POST'
          },
          LOGIN_WORKER : {
              path: 'Workers/login',
              method: 'POST'
          },
          LOGOUT_WORKER : {
              path: 'Workers/logout',
              method: 'POST'
          },
          GET_WORKER_INFO : {
              path: 'Workers/userId',
              method: 'GET'
          },
          GET_CATEGORIES : {
              path: 'Categories',
              method: 'GET'
          },
          GET_JOBS : {
              path: 'Workers/jobs',
              method: 'GET'
          },
          CHECK_APPLIED_JOB : {
                path: 'Workers/checkApplied',
                method: 'POST'
          },
          APPLY_JOB : {
                path: 'Workers/apply',
                method: 'POST'
          },
          FILTER_WORKER_JOBS: {
              path: 'Workers/jobs',
              method: 'GET'
          },
          COUNT_WORKER_JOBS: {
              path: 'Workers/countJobs',
              method: 'GET'
          },
          GET_APPLIED_JOBS: {
              path: 'Workers/jobsApplied',
              method: 'GET'
          },
          CHANGE_PASSWORD: {
              path: 'Workers/changePassword',
              method: 'POST'
          },
          UP_AVATAR: {
              path: 'Workers/setAvatar',
              method: 'POST'
          }
      }

    };
  }
];
