'use strict';
//filter format number. ex: 10,000
    var formatFn = function ($filter) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    return;
                }

                ctrl.$formatters.push(function (modelValue) {
                    return $filter(attrs.format)(modelValue);
                });

                ctrl.$parsers.push(function (viewValue) {

                    if (angular.isNumber(viewValue)) {
                        return viewValue;
                    }

                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                    if (plainNumber !== undefined && plainNumber !== '') {
                        plainNumber = parseFloat(plainNumber);
                    }
                    return plainNumber;
                });
            }
        };
    };
    
    module.exports = formatFn;