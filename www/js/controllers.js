angular.module('starter.controllers',[])
  .controller('mainCtrl', function ($rootScope, $cordovaGeolocation, myConst, getInfo, $ionicHistory) {
    if(localStorage.getItem('cityList') == null){
      $rootScope.cityArray = [];
    }else {
      $rootScope.cityArray = JSON.parse(localStorage.getItem('cityList')).slice();
    }
    $rootScope.back = function () {
      $ionicHistory.goBack();
    };
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
  .controller('searchCtrl', function ($scope, $rootScope, getSearch, getInfo, arrayFilter) {
    $scope.getSearchInput = function(search) {
      getSearch.getInput(search);
    };
    $scope.getSearchCityInfo = function(lat, lon, name) {
      $scope.searchLoc = lat + ',' + lon;
      $scope.searchName = name;
      getInfo.getWeatherMainInfo($scope.searchLoc)
        .then(function (resp) {
          $rootScope.searchInfo = resp.data.current_observation;
          $rootScope.searchInfo.display_location.full = $scope.searchName;
        });
      getInfo.getWeatherHourlyForecastInfo($scope.searchLoc)
        .then(function (resp) {
          console.log(resp.data);
          var searchHours = resp.data.hourly_forecast;
          $rootScope.searchHours = arrayFilter.getPosition(searchHours, 3);
          console.log($rootScope.searchHours);
        });
    };
  })
  .controller('cityListCtrl', function ($scope, $rootScope, $http, getInfo, arrayFilter, getSearch) {

  })
  .controller('cityCtrl', function () {

  })

  .controller('settingsCtrl', function () {

  });
