'use strict';
//filter format number. ex: 10,000
    var statusTranslateFn = function () {
        return function(status) {
            if (status === 'waiting') {
                return 'Đang chờ'
            }
        }
    };
    
    module.exports = statusTranslateFn;