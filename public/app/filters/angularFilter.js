var app = angular.module('userFilters', [])

.filter('classImageFilter', function () {
    return function(className) {
        return className.split(" ").join("").toLowerCase();
    };
})

.filter('isNotNumberThenZero', function () {

    return function(value) {
        if(isNaN(value)) {
            return 0;
        }
        return value;
    };
})

.filter('quizOptionFilter', function () {

    return function (option) {
        return String.fromCharCode(option + 64) ;
    }
})

.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
})

.filter('trustThisUrl', ["$sce", function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);
