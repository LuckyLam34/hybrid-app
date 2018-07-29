'use strict';

var AccountInfoController           = require('./accountInfo/accountInfoController');
var TransactionHistoryController    = require('./transactionHistory/transactionHistoryController');
var SlideMenuController             = require('./slideMenuController');
var AppliedJobListController        = require('./appliedJobList/AppliedJobListController');

var SlideMenuService                 = require('./slideMenuService');
var TransactionHistoryService       = require('./transactionHistory/transactionHistoryService');
var AppliedJobListService           = require('./appliedJobList/AppliedJobListService');
var ChangePasswordController = require('./changePassword/changePasswordController');

angular.module('IWorker.slideMenu', [])
.controller('AccountInfoController', AccountInfoController)
.controller('TransactionHistoryController', TransactionHistoryController)
.controller('SlideMenuController', SlideMenuController)
.controller('AppliedJobListController', AppliedJobListController)
.service('SlideMenuService', SlideMenuService)
.service('TransactionHistoryService', TransactionHistoryService)
.service('AppliedJobListService', AppliedJobListService)
.controller('ChangePasswordController', ChangePasswordController);