angular.module('starter.controllers',[])
  .controller('mainCtrl', function ($rootScope, $cordovaGeolocation, myConst, getInfo, $ionicHistory) {
    // $rootScope.back = function () {
    //   $ionicHistory.goBack();
    // };
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
$rootScope.getPosition = function () {
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $rootScope.loc = position.coords.latitude.toFixed(2) + ',' + position.coords.longitude.toFixed(2);
      console.log('location: '+ $rootScope.loc);
      getInfo.getWeatherMainInfo($rootScope.loc)
        .then(function (resp) {
            $rootScope.mainInfo = resp.data.current_observation;
            console.log('mainInfo: ' + $rootScope.mainInfo);
          }
        );
      getInfo.getWeatherForecastInfo($rootScope.loc)
        .then(
          function (resp) {
            $rootScope.forecastInfo = resp.data.forecast;
            console.log('forecastInfo: ' + $rootScope.forecastInfo);
          }
        )
    });
};
$rootScope.getPosition();

  })
  .controller('moreInfoCtrl', function ($rootScope, getInfo) {
    getInfo.getWeatherHourlyForecastInfo($rootScope.loc)
      .then(
        function (resp) {
          $rootScope.hourlyForecastInfo = resp.data.hourly_forecast;
          console.log('hourlyForecastInfo: ' + $rootScope.hourlyForecastInfo);
        }
      )
  })
  .controller('searchCtrl', function () {

  })
  .controller('cityListCtrl', function () {

  })
  .controller('cityCtrl', function () {

  })

  .controller('settingsCtrl', function () {

  });
