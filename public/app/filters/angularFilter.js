var app = angular.module('userFilters', [])

.filter('lengthFilter', function () {

    return function(value) {
        //console.log(value);
        if(value) {
            return (Object.keys(value)).length;
        }
        //console.log(Object.keys(value));
        return 0;
        //return Object.keys(value).length;
    };
})

.filter('trunc', function () {

    return function(value) {
        return Math.trunc(value);
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
