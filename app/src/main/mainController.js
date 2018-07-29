'use strict';

/**
 * @ngdoc function
 * @name IWorker.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',
    'PubSub',
    '$state',
    '$ionicHistory',
    '$rootScope',
    '$timeout',
    '$ionicViewSwitcher',

    function( $scope, PubSub, $state, $ionicHistory, $rootScope, $timeout, $ionicViewSwitcher)
    {
        var self = this;

        self.goBack = function() {
            $ionicHistory.goBack();
        }

        self.toLoginPage = function() {
            $timeout(function() {
                $ionicViewSwitcher.nextDirection('forward');
                $state.go('tabs');
            }, 1500);
        }
    }
];