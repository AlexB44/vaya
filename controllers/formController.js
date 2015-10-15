function formController($scope, $http) {
  $scope.title = "Hey!";
  var data = {};
  $scope.firstTime = false;
  var map = L.map('map').setView([35.47, -97.52], 13);                     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  
  function updateWeather(weather) {
    var icon = weather.icon;
    var image = document.querySelector("img");
    image.src = "http://openweathermap.org/img/w/" + icon + ".png";
    $scope.image = true;
  }
  
  function updateMap(coord) {
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