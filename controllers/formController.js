function formController($scope, $http) {
  $scope.title = "Accueil";
  var data = {};
  $scope.firstTime = false;
  var map = L.map('map').setView([35.47, -97.52], 13);                     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  
  function updateWeather(weather) {
    console.log(weather);
    var icon = weather.icon;
    var image = document.querySelector("img");
    image.src = "http://openweathermap.org/img/w/" + icon + ".png";
    $scope.image = true;
  }
  
  function updateMap(coord) {
    lon = coord.lon;
    lat = coord.lat;
    map.panTo(new L.LatLng(lat, lon));
    $scope.firstTime = true;
  }
  
  function updateDOM() {
    $scope.title = data.name;
    updateWeather(data.weather[0]);
    updateMap(data.coord);
  }
  
  $scope.sendForm = function() {
    if (!$scope.form || $scope.form === "") { return }
    var location = $scope.form;
    $scope.form = "";
    $http({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=39583154fb47ae5a44360b9c46bb99d2"
    }).then(function sucess(res) {
      data = res.data;
      console.log(data);
      updateDOM();
    }, function fail(res) {
      console.log("error : " + res)
    });
  }
}