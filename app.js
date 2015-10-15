function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "views/form.html",
      controller: "formController"
    })
    .otherwise({
        redirectTo: '/'
    });
}

angular.module("vaya", ["ngRoute"])
  .config(config)
  .controller('formController', formController)