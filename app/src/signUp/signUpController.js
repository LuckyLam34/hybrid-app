'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:SignUpControler
 * @description
 * # SignUpControler
 */
module.exports = [
    '$scope',
    '$http',
    'PubSub',
    '$state',
    'apiPaths',
    'apiHeaders',
    'apiWrapper',
    'LocalStorageService',

    function ($scope, $http, PubSub, $state, apiPaths, apiHeaders, apiWrapper, LocalStorageService) {

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

        self.formSubmit = function () {
            var request = self.user;
            apiWrapper.callService(url, method, request).then(function (data) {
                console.log(data);
                $state.go('app.signUpConfirm');
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