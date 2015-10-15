function formController($scope, $http) {
  $scope.title = "Accueil";
  var data = {};
  
  $scope.sendForm = function() {
    if (!$scope.form || $scope.form === "") { return }
    var location = $scope.form;
    $scope.title = location;
    $scope.form = "";
    $http({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=39583154fb47ae5a44360b9c46bb99d2"
    }).then(function sucess(res) {
      data = res.data;
      console.log(data);
    }, function fail(res) {
      console.log("error : " + res)
    });
  }
}