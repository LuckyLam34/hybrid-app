// 'use strict';

// /**
//  * @ngdoc function
//  * @name IWorker.controller:WorkController
//  * @description
//  * # WorkController
//  */
// module.exports = [
//     '$scope',
//     '$http',
//     '$state',
//     'apiPaths',
//     'apiHeaders',
//     'apiWrapper',
//     'CommonServices',
//     'LocalStorageService',

//     function( $scope, $http, $state, apiPaths, apiHeaders, apiWrapper, CommonServices, LocalStorageService)
//     {
//         var self = this;
        
//         // MODELS
//         self.userProfile = {};
//         self.userOptions = [];

//         var url = apiPaths.SERVICE_METHODS.GET_EMPLOYER_INFO.path;
//         var method = apiPaths.SERVICE_METHODS.GET_EMPLOYER_INFO.method;
//         var request = {};

//         var urlLogout = apiPaths.SERVICE_METHODS.LOGOUT_EMPLOYER.path;
//         var methodLogout = apiPaths.SERVICE_METHODS.LOGOUT_EMPLOYER.method;
//         var requestLogout = {};

//         // FUNCTIONS
//         var init = function() {
//             // CommonServices.getUserProfile('userId').then(function(data) {
//             //     self.userProfile = data[0];
//             // }, function(err) {
//             //     console.log('err: ' + err);
//             // });
//             apiWrapper.callService(url, method, request).then(function (data) {
//                 console.log(data);
//                 self.userProfile = data;
//             }, function (err) {
//                 console.log('err: ' + err);
//             });

//             CommonServices.getUserOptions().then(function(data) {
//                 self.userOptions = data;
//             }, function(err) {
//                 console.log('err: ' + err);
//             });
//         }
        
//         init();

//         self.logout = function () {
//             apiWrapper.callService(urlLogout, methodLogout, requestLogout).then(function (data) {
//                 console.log(data);
//                 LocalStorageService.setAccessToken(null);
//                 $state.go('tabs');
//             }, function (err) {
//                 console.log('err: ' + err);
//             });
//         }
//     }
// ];