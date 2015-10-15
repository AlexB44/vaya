function formController($scope, $http) {
  $scope.title = "Hey!";
  var data = {};
  $scope.firstTime = false;
  
  var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/balthazar.nnbl166e/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFsdGhhemFyIiwiYSI6ImNpZnNub2kxdDAxdjZ0ZG0wZm51amJhaXMifQ.Ltgv_P4UktIZJRGjurLGBg', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});
  
  var map = L.map('map')
    .addLayer(mapboxTiles)
    .setView([42.3610, -71.0587], 12);
  
  function updateWeather(weather) {
    var icon = weather.icon;
    var image = document.querySelector("img");
    image.src = "http://openweathermap.org/img/w/" + icon + ".png";
    $scope.image = true;
    $scope.temperature = Math.round(data.main.temp);
  }
  
  function updateMap(coord) {
    map.resize;
    map.panTo(new L.LatLng(coord.lat, coord.lon));
    $scope.firstTime = true;
  }
  
  function checkPHMA(shom) {
    console.log(shom);
    i = 0;
    len = shom.records.length;
    while (i < len) {
      if (shom.records[i].fields.site == data.name) {
        $scope.nm = shom.records[i].fields.phma;
        $scope.big = false;
        $scope.huge = false;
        if ($scope.nm > 300 && $scope.nm < 1000)
          $scope.big = true;
        if ($scope.nm > 1000)
          $scope.huge = true;
        return
      }
      ++i;
    }
    $scope.nm = false;
  }
  
  function updatePHMA() {
    $http({
      method: "GET",
      url: " https://shom.opendatasoft.com/api/records/1.0/search?dataset=references-altimetriques-maritimes0&q=" + data.name + "&facet=zone&facet=rf&facet=organisme&facet=reference"
    }).then(function sucess(res) {
      checkPHMA(res.data);
    }, function fail(res) {
      console.log("erreur shom : " + res);
    })
  }
  
  function updateDOM() {
    $scope.title = data.name;
    updateWeather(data.weather[0]);
    updateMap(data.coord);
    updatePHMA();
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
      updateDOM();
    }, function fail(res) {
      console.log("error : " + res)
    });
  }
}