'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:AccountInfoController
 * @description
 * # AccountInfoController
 */
module.exports = [
  '$scope',
  '$http',
  '$state',
  'apiPaths',
  'apiHeaders',
  'apiWrapper',
  'CommonServices',
  'LocalStorageService',
  'SlideMenuService',
  '$ionicPopup',
  '$ionicPopover',
  '$cordovaCamera',

  function ($scope, $http, $state, apiPaths, apiHeaders, apiWrapper, CommonServices, LocalStorageService, SlideMenuService, $ionicPopup, $ionicPopover, $cordovaCamera) {
    var self = this;
    var urlProfile = apiPaths.SERVICE_METHODS.GET_WORKER_INFO.path;
    var methodProfile = apiPaths.SERVICE_METHODS.GET_WORKER_INFO.method;
    self.userProfile = {};
    apiWrapper.callService(urlProfile, methodProfile, {}).then(function (data) {
      self.userProfile = data;
      CommonServices.userProfile = data;
    }, function (err) {
      console.log('err: ' + err);
    });

    self.goBack = function () {
      $ionicHistory.goBack();
    };

    self.goMyAppliedJobs = function () {
      $state.go('work.appliedJobList');
    };

    self.goTransactionHistory = function () {
      $state.go('work.transactionHistory', {
        object: self.userProfile
      });
    };

    self.goChangePassword = function () {
      $state.go('work.changePassword');
    };

    $scope.takePicture = function () {
      $scope.popover.hide();
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        if (imageData) {
          var _imageData = 'data:image/jpeg;base64,' + imageData;
          uploadImage(_imageData);
        }
      }, function (err) {
        // $ionicPopup.alert({
        //   title: 'Error',
        //   template: error.data.error.message
        // })
      });
    }

    $scope.selectPicture = function () {
      $scope.popover.hide();
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300
      };

      $cordovaCamera.getPicture(options).then(function (imageURL) {
        convertToBase64(imageURL, function (imageData) {
          if (imageData) {
            uploadImage(imageData);
          }
        });
      }, function (err) {
        // $ionicPopup.alert({
        //   title: 'Lỗi',
        //   template: 'Xảy ra lỗi'
        // })
      })
    }


    $ionicPopover.fromTemplateUrl('src/slideMenu/uploadImagePopover.html', {
      scope: $scope,
    }).then(function (popover) {
      $scope.popover = popover;
    });

    self.showPopover = function ($event) {

      $scope.popover.show($event);
    };

    //base64 image data
    var uploadImage = function (imageData) {
      SlideMenuService.uploadAvatar(imageData).then(function (result) {
        self.userProfile.avatar = imageData;

        $ionicPopup.alert({
          title: 'Thành công',
          template: 'Tải ảnh thành công'
        })
      }, function (err) {
        $ionicPopup.alert({
          title: 'Lỗi',
          template: 'Xảy ra lỗi'
        })
      });
    }

    var convertToBase64 = function (url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        }

        reader.readAsDataURL(xhr.response);
      };

      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
  }
];
