var searchbar = function() {
    return {
        replace: true,
        restrict: 'AE',
        templateUrl: 'src/common/searchbar/searchbar.html',
        controller: 'SearchBarController'
    };
};

module.exports = searchbar;