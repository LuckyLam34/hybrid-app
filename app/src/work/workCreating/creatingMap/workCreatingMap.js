'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:ClientControler
 * @description
 * # ClientControler
 */
module.exports = [
  '$scope',
  '$state',
  '$cordovaGeolocation',
  '$ionicLoading',
  '$ionicPlatform',
  'WorkCreatingService',
  '$ionicHistory',
  'CommonServices',

  function ($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, WorkCreatingService, $ionicHistory, CommonServices) {

    var self = this;
    var marker = '';
    var infowindow = '';
    self.place = {};

    $scope.$on('$ionicView.beforeEnter', function () {
      self.job = WorkCreatingService.getJob();
      self.place.address = self.job.address;
    });
    

    self.goBack = function () {
      $ionicHistory.goBack();
    }

    self.saveLocation = function(){
      var index = -1;
      for(var i=0, l=self.job.places.length; i<l; i++){
        if(self.job.places[i].address === self.place.address) index = i;
      }
      if(index<0){
        self.job.places.push(self.place);
        WorkCreatingService.saveLocation(self.place);
      }
      self.job.address = self.place.address;
      $state.go('work.workCreatingDetail');
    }

    self.loadMap = function () {

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Đang tải...'
      });

      var options = {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 0
      }

      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var geocoder = new google.maps.Geocoder;
        // infowindow = new google.maps.InfoWindow;


        // geocodeLatLng(geocoder, self.map, infowindow, latLng);

        var latlngStr = latLng.toString().split(',', 2);

        var latlng = {
          lat: parseFloat(latlngStr[0].replace('(', '')),
          lng: parseFloat(latlngStr[1])
        };

        geocoder.geocode({
          'location': latlng
        }, function (results, status) {
          if (status === 'OK') {
            if (results[1]) {
              self.map.setZoom(11);
              marker = new google.maps.Marker({
                position: latlng,
                map: self.map
              });

              marker.infowindow = new google.maps.InfoWindow({
                content: results[1].formatted_address
              });

              // infowindow.setContent(results[1].formatted_address);

              //force to update DOM
              $scope.$apply(function () {
                self.place.address = results[1].formatted_address;
                self.place.location = latlng;
              });

              marker.infowindow.open(self.map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
        $ionicLoading.hide();
      }, function (error) {
        console.log("Could not get location, error: " + error);
        $ionicLoading.hide();
      });
    };

    self.onChange = function () {
      marker.setVisible(false);

      if (marker.infowindow) {
        marker.infowindow.close();
      }

      var container = document.getElementsByClassName('pac-container');
      angular.element(container).attr('data-tap-disabled', 'true');
      var backdrop = document.getElementsByClassName('backdrop');
      angular.element(backdrop).attr('data-tap-disabled', 'true');
      angular.element(container).on("click", function () {
        document.getElementById('input').blur();
      });

      var input = document.getElementById('input');
      var autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.bindTo('bounds', self.map);

      var infowindow = new google.maps.InfoWindow();

      marker = new google.maps.Marker({
        map: self.map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      // infowindow.setContent(self.address);

      autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);

        var place = autocomplete.getPlace();

        if (!place.geometry) {
          window.alert('No details: ' + place.name);

          return;
        }

        if (place.geometry.viewport) {
          self.map.fitBounds(place.geometry.viewport);
        } else {
          self.map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        self.place.address = place.formatted_address;
        self.place.location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        marker.setPosition(place.geometry.location);

        marker.infowindow = new google.maps.InfoWindow({
          content: document.getElementById('input').value
        });

        marker.setVisible(true);
        marker.infowindow.open(self.map, marker);
      });
    };

    self.clear = function () {
      self.currentPlace = {};
    }

  }
];
