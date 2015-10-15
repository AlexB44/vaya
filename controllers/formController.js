function formController($scope, $http) {
  $scope.title = "Accueil";
  
  $scope.sendForm = function() {
    if (!$scope.form || $scope.form === "") { return }
    var location = $scope.form;
    $scope.title = location;
    $scope.form = "";
  }
}