'use strict';

var WorkDetailController = require('./workDetail/workDetailController');
var WorkListController = require('./workList/workListController');
var WorkCreating = require('./workCreating/workCreating');
var WorkCreatingDetail = require('./workCreating/creatingDetail/workCreatingDetail');
var WorkCreatingInfo = require('./workCreating/creatingInfo/workCreatingInfo');
var WorkCreatingConfirm = require('./workCreating/creatingConfirm/workCreatingConfirm');
var WorkCreatingMap = require('./workCreating/creatingMap/workCreatingMap');
var WorkController = require('./workController');

var WorkDetailService = require('./workDetail/workDetailService');
var WorkListService = require('./workList/workListService');
var WorkCreatingService = require('./workCreating/workCreatingService');
var WorkService = require('./workService');

angular.module('IWorker.work', [])
    .controller('WorkDetailController', WorkDetailController)
    .controller('WorkListController', WorkListController)
    .controller('WorkCreating', WorkCreating)
    .controller('WorkCreatingDetail', WorkCreatingDetail)
    .controller('WorkCreatingInfo', WorkCreatingInfo)
    .controller('WorkCreatingConfirm', WorkCreatingConfirm)
    .controller('WorkCreatingMap', WorkCreatingMap)
    .controller('WorkController', WorkController)
    .service('WorkDetailService', WorkDetailService)
    .service('WorkListService', WorkListService)
    .service('WorkCreatingService', WorkCreatingService)
    .service('WorkService', WorkService);