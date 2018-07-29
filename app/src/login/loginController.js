'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:LoginController
 * @description
 * # LoginController
 */
module.exports = [
    '$state',
    '$scope',
    'LoginService',
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',

    function ($state, $scope, LoginService, apiPaths, apiHeaders, apiWrapper, LocalStorageService) {
        var self = this;
        var wrongLogin = false;

        $scope.$on('$ionicView.beforeEnter', function () {
            var accessToken = LocalStorageService.getAccessToken();
            if (accessToken) {
                apiHeaders.setAuthorization(accessToken);
                $state.transitionTo('work.workList');
            }
        });

        self.formSubmit = function () {
            var request = {
                username: self.username,
                password: self.password
            }

            var url = apiPaths.SERVICE_METHODS.LOGIN_WORKER.path;
            var method = apiPaths.SERVICE_METHODS.LOGIN_WORKER.method;

            apiWrapper.callService(url, method, request).then(function (data) {
                console.log('logindata', JSON.stringify(data));
                LocalStorageService.setAccessToken(data.id);
                LocalStorageService.setUserData(data);
                apiHeaders.setAuthorization(data.id);
                self.wrongLogin = false;
                $state.transitionTo('work.workList');
            }, function (err) {
                console.log('err: ' + err);
                self.wrongLogin = true;
            });
        };


        //Register
        //models
        var self = this;
        self.user = {
            email: '',
            password: '',
            lastname: '',
            firstname: '',
            phone: '',
            username: '',
            dob: '',
            gender: '',
            availableAmount: '0',
            actualAmount: '0',
            pendingAmount: '0'
        };

        var url = apiPaths.SERVICE_METHODS.CREATE_WORKER.path;
        var method = apiPaths.SERVICE_METHODS.CREATE_WORKER.method;

        self.formSubmitRegister = function () {
            var request = self.user;
            apiWrapper.callService(url, method, request).then(function (data) {
                var url = apiPaths.SERVICE_METHODS.LOGIN_WORKER.path;
                var method = apiPaths.SERVICE_METHODS.LOGIN_WORKER.method;

                apiWrapper.callService(url, method, request).then(function (data) {
                    
                    LocalStorageService.setAccessToken(data.id);
                    LocalStorageService.setUserData(data);
                    apiHeaders.setAuthorization(data.id);
                    
                    $state.go('work.workList');
                }, function (err) {
                    console.log('err: ' + err);
                    self.wrongLogin = true;
                });
            }, function (err) {
                console.log('err: ' + err);
            });

        }

        self.goNext = function () {
            if ($state.current.name === 'app.signUpConfirmCode') {
                $state.go('work.workCreating');
            }
        }

        self.goLogin = function () {
            $state.go('tabs');
        }

        self.sendData = function (data) {
            if ($state.current.name === 'app.signUp') {

                LocalStorageService.saveUserData(data);
                $state.go('app.signUpConfirm', { userData: data });
            } else if ($state.current.name === 'app.signUpConfirm') {
                LocalStorageService.saveUserPhoneNumber(data);
                $state.go('app.signUpConfirmCode', { userPhone: data });
            }
        }

    }
];
