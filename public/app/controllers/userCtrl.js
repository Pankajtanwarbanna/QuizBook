/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices'])

.controller('regCtrl', function ($scope, $http, $timeout, $location,user) {

    var app = this;

    this.regUser = function (regData) {

        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;

        user.create(app.regData).then(function (data) {

            //console.log(data);
            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + ' Redirecting to home page...';
                $timeout(function () {
                    $location.path('/');
                }, 2000);
                
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
})

// quiz controller
.controller('quizCtrl', function (user) {

    let app = this;

    // get all quizzes function
    function getAllQuizzes() {
        user.getAllQuizzes().then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.quizzes= data.data.quizzes;
            } else {
                app.errorMsg = data.data.message;
            }
        })
    }

    getAllQuizzes();
})

// attend quiz controller
.controller('attendQuizCtrl', function ($routeParams,$scope, $interval,$timeout, user) {

    let app = this;

    function getQuiz() {
        user.getQuiz($routeParams.quizID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.quiz = data.data.quiz;
                timerFunction(app.quiz.duration);
            } else {
                app.errorMsg = data.data.message;
            }
        })
    }
    getQuiz();

    function timerFunction(quizTime) {
        console.log(quizTime);

        $scope.quizTimeMinute = quizTime;
        $scope.quizTime = $scope.quizTimeMinute * 60;
        $scope.quizTimeRemainingMinute = $scope.quizTime / 60;
        $scope.quizTimeRemainingSeconds = $scope.quizTime % 60;

        let timerId = $interval(function () {
            $scope.quizTime = $scope.quizTime - 1;
            $scope.quizTimeRemainingMinute = Math.floor($scope.quizTime / 60);
            $scope.quizTimeRemainingSeconds = $scope.quizTime % 60;
            if($scope.quizTimeRemainingMinute < 5) {
                $scope.quizTimeLess = 'Less then 5 Minutes is remaining. Please complete the quiz on time.'
            }
        }, 1000);

        $timeout(function () {
            $interval.cancel(timerId);
            //console.log('Time Over');
            app.submittingTest = true;
        }, $scope.quizTime * 1000);
    }

    app.submitData = {};

    app.submitQuizNow = function () {

        app.loading = true;

        app.submitData.questions = app.questions;
        app.submitData.timeLeftInSeconds = ($scope.quizTimeRemainingMinute * 60) + $scope.quizTimeRemainingSeconds;
        console.log(app.submitData);
        user.submitQuizNow(app.submitData, $routeParams.quizID).then(function (data) {
            if(data.data.success) {
                app.successMsg = data.data.message;
                app.loading = false;
            } else {
                app.errorMsg = data.data.message;
                app.loading = false;
            }
        })
    }

})


.controller('usersCtrl', function (user) {
    var app = this;

    user.getUsers().then(function (data) {

        if(data.data.success) {
            console.log(app.users);
            app.users = data.data.users;
        } else {
            app.errorMsg = data.data.message;
        }
    });
});
