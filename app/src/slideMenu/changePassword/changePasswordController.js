'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:ChangePasswordController
 * @description
 * # ChangePasswordController
 */
module.exports = [
  '$scope',
  '$state',
  'apiPaths',
  'apiHeaders',
  'apiWrapper',
  'CommonServices',
  'LocalStorageService',
  '$ionicHistory',
  '$ionicPopup',

  function ($scope, $state, apiPaths, apiHeaders, apiWrapper, CommonServices, LocalStorageService, $ionicHistory, $ionicPopup) {
    var self = this;

    self.goBack = function () {
      $ionicHistory.goBack();
    }

    self.changePassword = function (form) {
      self.error = "Vui lòng điền đầy đủ và chính xác thông tin, độ dài mật khẩu không được nhỏ hơn 8 kí tự";
      form.$submitted = true;
      if (form.$valid) {
        if (self.newPasswordFirst != self.newPasswordSecond) {
          self.error = "Mật khẩu nhập lại không trùng khớp";
          form.$invalid = true;
        } else {
          var request = {
            oldPassword: self.oldPassword,
            newPassword: self.newPasswordFirst
          }

          var url = apiPaths.SERVICE_METHODS.CHANGE_PASSWORD.path;
          var method = apiPaths.SERVICE_METHODS.CHANGE_PASSWORD.method;

          apiWrapper.callService(url, method, request).then(function (data) {
            var alertPopup = $ionicPopup.alert({
              title: 'Thông báo',
              template: 'Bạn đã thay đổi mật khẩu thành công'
            });

            alertPopup.then(function (res) {
              LocalStorageService.setAccessToken(null);
              $state.go('tabs', {}, {
                reload: 'tabs'
              });
            });

          }, function (error) {
            self.error = error.data.error.message;
            form.$invalid = true;
          });
        }
      }
    }
  }
];
