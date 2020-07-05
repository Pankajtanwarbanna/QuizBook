angular.module('userApp', ['userRoutes','userCtrl','mainController','managementController','emailController','userFilters'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
