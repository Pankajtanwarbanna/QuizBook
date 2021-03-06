var app = angular.module('userRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : '/app/views/users/register.html',
                controller : 'regCtrl',
                controllerAs : 'register',
                authenticated : false
            })

            .when('/logout', {
                templateUrl : '/app/views/users/logout.html',
                authenticated : false,
                controller : 'editCtrl',
                controllerAs : 'edit'
            })

            .when('/users/:username', {
                templateUrl : '/app/views/users/userProfile.html',
                authenticated : true
            })

            .when('/about', {
                templateUrl : '/app/views/pages/about.html',
                authenticated : false
            })

            .when('/contact', {
                templateUrl : '/app/views/pages/contact.html',
                authenticated : false
            })

            .when('/services', {
                templateUrl : '/app/views/pages/services.html',
                authenticated : false
            })

            .when('/activate/:token', {
                templateUrl : '/app/views/users/activation/activate.html',
                authenticated : false,
                controller : 'emailCtrl',
                controllerAs : 'email'
            })

            .when('/resend', {
                templateUrl : '/app/views/users/activation/resend.html',
                authenticated : false,
                controller : 'resendCtrl',
                controllerAs : 'resend'
            })

            .when('/forgot', {
                templateUrl : '/app/views/users/forgot.html',
                authenticated : false,
                controller : 'forgotCtrl',
                controllerAs : 'forgot'
            })

            .when('/forgotPassword/:token', {
                templateUrl : 'app/views/users/resetPassword.html',
                authenticated : false,
                controller : 'resetCtrl',
                controllerAs : 'reset'
            })

            .when('/management', {
                templateUrl : 'app/views/admin/management.html',
                authenticated : true,
                controller : 'managementCtrl',
                controllerAs : 'management',
                permission : 'admin'
            })

            .when('/edit/:id', {
                templateUrl : 'app/views/admin/edit.html',
                authenticated : true,
                controller : 'editCtrl',
                controllerAs : 'edit',
                permission : 'admin'
            })


            .when('/add-quiz', {
                templateUrl : 'app/views/admin/add-quiz.html',
                authenticated : true,
                controller : 'addQuizCtrl',
                controllerAs : 'addQuiz',
                permission : 'admin'
            })

            .when('/quizzes', {
                templateUrl : 'app/views/pages/quizzes.html',
                authenticated : true,
                controller : 'quizCtrl',
                controllerAs : 'quiz'
            })

            .when('/quiz/:quizID', {
                templateUrl : 'app/views/pages/quiz.html',
                authenticated : true,
                controller : 'attendQuizCtrl',
                controllerAs : 'attendQuiz'
            })

            .when('/leaderboard/:quizID', {
                templateUrl : 'app/views/pages/leaderboard.html',
                authenticated : true,
                controller : 'leaderboardCtrl',
                controllerAs : 'leaderboard'
            })

            .when('/answersheet/:quizID', {
                templateUrl : 'app/views/pages/answersheet.html',
                authenticated : true,
                controller : 'answersheetCtrl',
                controllerAs : 'answersheet'
            })

            .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
    });

app.run(['$rootScope','auth','$location', 'user', function ($rootScope,auth,$location,user) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if(next.$$route) {

            if(next.$$route.authenticated === true) {

                if(!auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if(next.$$route.permission) {

                    user.getPermission().then(function (data) {

                        if(next.$$route.permission !== data.data.permission) {
                            event.preventDefault();
                            $location.path('/');
                        }

                    });
                }

            } else if(next.$$route.authenticated === false) {

                if(auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }

            } /*else {
                console.log('auth doesnot matter');
            }
            */
        } /*else {
            console.log('Home route is here');
        }
*/
    })
}]);

