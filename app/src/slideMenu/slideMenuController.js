'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:SlideMenuController
 * @description
 * # SlideMenuController
 */
module.exports = [
  '$scope',
  '$http',
  '$state',
  '$ionicHistory',
  'apiPaths',
  'apiHeaders',
  'apiWrapper',
  'CommonServices',
  'LocalStorageService',
  'SlideMenuService',
  '$ionicPopup',
  '$ionicPopover',
  '$cordovaCamera',

  function ($scope, $http, $state, $ionicHistory, apiPaths, apiHeaders, apiWrapper, CommonServices, LocalStorageService, SlideMenuService, $ionicPopup, $ionicPopover, $cordovaCamera) {
    var self = this;

    // MODELS
    self.userProfile = {};
    self.userOptions = [];

    var urlProfile = apiPaths.SERVICE_METHODS.GET_WORKER_INFO.path;
    var methodProfile = apiPaths.SERVICE_METHODS.GET_WORKER_INFO.method;

    var urlLogout = apiPaths.SERVICE_METHODS.LOGOUT_WORKER.path;
    var methodLogout = apiPaths.SERVICE_METHODS.LOGOUT_WORKER.method;

    // FUNCTIONS
    var init = function () {
      apiWrapper.callService(urlProfile, methodProfile, {}).then(function (data) {
        console.log(data);
        self.userProfile = data;
        CommonServices.userProfile = data;
      }, function (err) {
        console.log('err: ' + err);
      });

      CommonServices.getUserOptions().then(function (data) {
        self.userOptions = data;
      }, function (err) {
        console.log('err: ' + err);
      });
    }

    init();
    self.goBack = function() {
      $state.go('work.workList');
    }
    self.logout = function () {
      apiWrapper.callService(urlLogout, methodLogout, {}).then(function (data) {
        console.log(data);
        LocalStorageService.setAccessToken(null);
        $state.go('tabs', {}, {
          reload: 'tabs'
        });
      }, function (err) {
        console.log('log out failed: ' + err);
      });
    }

    self.goAccountInfo = function (){
      $state.go('work.accountInfo', {object: self.userProfile});
    }

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
