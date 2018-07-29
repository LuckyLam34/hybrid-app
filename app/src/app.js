'use strict';


/**
 * @ngdoc overview
 * @name IWorker
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// Example to require lodash
// This is resolved and bundled by browserify
//
var _ = require( 'lodash' );

require('./login/module');
require('./signUp/module');
require('./slideMenu/module');
require('./work/module');
require('./main/module');
require('./common/module');

var CommonServices       = require('./commonServices');
var ConfigurationService = require('./configurationService'); 
var LocalStorageService  = require('./localStorageService');
var apiPaths = require('./apiPaths');
var apiHeaders = require('./apiHeaders');
var apiWrapper = require('./apiWrapper');


require('../../node_modules/angular-PubSub/dist/angular-pubsub.min');
require('../../node_modules/q/q');

angular.module( 'IWorker', [
  'ionic',
  'ngCordova',
  'ngResource',
  'IWorker.directives',
  'IWorker.login',
  'IWorker.signUp',
  'IWorker.slideMenu',
  'IWorker.work',
  'IWorker.main',
  'PubSub',
  'ngStorage'
] )
.run( [
  '$ionicPlatform',
  '$rootScope',
  '$state',
  'PubSub',

  function( $ionicPlatform, $rootScope, $state, PubSub )
  {

  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here
  $rootScope.PubSubService = { 
      'JobsFilterResults': 'JobsFilterResults'
  };

  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
  });

} ] )
.config([
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function($httpProvider, $stateProvider, $urlRouterProvider) {
         $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'src/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            // .state('app.login', {
            //     url: '/login',
            //     views: {
            //         'viewContent': {
            //             templateUrl: 'src/login/login.html',
            //             controller: 'LoginController',
            //             controllerAs: 'vm'
            //         }
            //     }
            // })
            .state('tabs', {
                url: '/tab',
                templateUrl: 'src/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('app.signUp', {
                url: '/signUp',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/signUp/signUp.html',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.signUpConfirm', {
                url: '/signUpConfirm',
                cache: false,
                params: {
                    userData: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/signUp/signUpConfirm.html',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.signUpConfirmCode', {
                url: '/signUpConfirmCode',
                cache: false,
                params: {
                    userPhone: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/signUp/signUpConfirmCode.html',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work', {
                url: '/work',
                cache: false,
                abstract: true,
                templateUrl: 'src/slideMenu/slideMenu.html',
                controller: 'SlideMenuController',
                controllerAs: 'vm'
            })
            .state('work.workCreating', {
                url: '/workCreating',
                cache: false,
                params: {
                    status: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workCreating/workCreating.html',
                        controller: 'WorkCreating',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.workCreatingMap', {
                url: '/workCreatingMap',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workCreating/creatingMap/workCreatingMap.html',
                        controller: 'WorkCreatingMap',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.workCreatingDetail', {
                url: '/workCreatingDetail',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workCreating/creatingDetail/workCreatingDetail.html',
                        controller: 'WorkCreatingDetail',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.workCreatingInfo', {
                url: '/workCreatingInfo',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workCreating/creatingInfo/workCreatingInfo.html',
                        controller: 'WorkCreatingInfo',
                        controllerAs: 'vm'
                    }
                }
            }).state('work.workCreatingConfirm', {
                url: '/workCreatingConfirm',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workCreating/creatingConfirm/workCreatingConfirm.html',
                        controller: 'WorkCreatingConfirm',
                        controllerAs: 'vm'
                    }
                }
            }).state('work.workList', {
                url: '/workList',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workList/workList.html',
                        controller: 'WorkListController',
                        controllerAs: 'vm'
                    }
                }
            }).state('work.workDetail', {
                url: '/workDetail',
                cache: false,
                params: {
                    object: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/work/workDetail/workDetail.html',
                        controller: 'WorkDetailController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('welcome', {
                url: '/',
                cache: false,
                templateUrl: 'src/main/welcome.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('work.accountInfo', {
                url: '/accountInfo',
                cache: false,
                params: {
                    object: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/slideMenu/accountInfo/accountInfo.html',
                        controller: 'AccountInfoController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.transactionHistory', {
                url: '/transactionHistory',
                cache: false,
                params: {
                    object: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/slideMenu/transactionHistory/transactionHistory.html',
                        controller: 'TransactionHistoryController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.appliedJobList', {
                url: '/appliedJobList',
                cache: false,
                params: {
                    object: null
                },
                views: {
                    'viewContent': {
                        templateUrl: 'src/slideMenu/appliedJobList/appliedJobList.html',
                        controller: 'AppliedJobListController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('work.changePassword', {
                url: '/changePassword',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'src/slideMenu/changePassword/changePassword.html',
                        controller: 'ChangePasswordController',
                        controllerAs: 'vm'
                    }
                }
            });
        $urlRouterProvider.otherwise('/'); 
    }
])
.constant('_', _)
.service('CommonServices', CommonServices)
.service('ConfigurationService', ConfigurationService)
.service('LocalStorageService', LocalStorageService)
.service('apiPaths', apiPaths)
.service('apiHeaders', apiHeaders)
.service('apiWrapper', apiWrapper);
