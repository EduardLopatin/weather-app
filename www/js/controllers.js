angular
  .module('starter.controllers', [])
  .controller('mainCtrl', function ($scope, $rootScope, $cordovaGeolocation, myConst, getInfo, $ionicHistory, getStyle, $ionicLoading) {
    $rootScope.show = function() {
      $ionicLoading.show({
        template: 'Loading...',
        noBackdrop: false
      })
    };
    $rootScope.hide = function(){
      $ionicLoading.hide()
    };

    $rootScope.back = function () {
      $ionicHistory.goBack();
    };
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $rootScope.getPosition = function () {
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $rootScope.show();
          $rootScope.loc = position.coords.latitude.toFixed(2) + ',' + position.coords.longitude.toFixed(2);
          console.log('location: '+ $rootScope.loc);
          getInfo.getWeatherMainInfo($rootScope.loc)
            .then(function (resp) {
                $rootScope.mainInfo = resp.data.current_observation;
              }
            );
          getInfo.getWeatherForecastInfo($rootScope.loc)
            .then(
              function (resp) {
                $rootScope.forecastInfo = resp.data.forecast.simpleforecast.forecastday;
              }
            )
          getInfo.getWeatherHourlyForecastInfo($rootScope.loc)
            .then(function (resp) {
              $rootScope.HourlyForecastInfo = resp.data.hourly_forecast;
              var CheckTime = $rootScope.HourlyForecastInfo[0].FCTTIME.hour;
              console.log('res ' + CheckTime);
              $rootScope.mainStyle =  getStyle.getMainStyleByTime(CheckTime);
              $rootScope.buttonsStyle = getStyle.getButtonStyleByTime(CheckTime);
                $scope.labels = [];
                $scope.data = [];
              $rootScope.HourlyForecastInfo.forEach(function (item) {
                  $scope.labels.push(item.FCTTIME.hour);
                  $scope.data.push(item.temp.metric)
                });
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                $scope.options = {
                  scales: {
                    yAxes: [
                      {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                      }
                    ],
                    xAxes:[
                      {
                        display: false
                      }
                    ]
                  }
                };
              $rootScope.hide();
            })
        });
    };
 $rootScope.getPosition();
  })
  .controller('searchCtrl', function ($scope, $rootScope, getSearch, getInfo, getStyle) {
    $rootScope.getSearchInput = function (search) {
      getSearch.getInput(search);
    };
    $rootScope.getSearchCityInfo = function(lat, lon, name){
      $rootScope.show();
      var loc = lat + ',' + lon;
      console.log(loc);
      getInfo.getWeatherMainInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityMainInfo = resp.data.current_observation;
          $rootScope.searchCityMainInfo.display_location.full = name;
        });
      getInfo.getWeatherForecastInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityForecastInfo = resp.data.forecast.simpleforecast.forecastday;
        });
      getInfo.getWeatherHourlyForecastInfo(loc)
        .then(function (resp) {
          $rootScope.searchHourlyForecastInfo = resp.data.hourly_forecast;
          var CheckTime = $rootScope.searchHourlyForecastInfo[0].FCTTIME.hour;
          console.log('res '+CheckTime);
          $rootScope.mainStyle =  getStyle.getMainStyleByTime(CheckTime);
          $rootScope.buttonsStyle = getStyle.getButtonStyleByTime(CheckTime);
          $rootScope.hide();
        })
    }
  })
  .controller('cityListCtrl', function ($rootScope, getInfo, getStyle) {
    $rootScope.showCity = function (loc, name) {
      $rootScope.show();
      getInfo.getWeatherMainInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityMainInfo = resp.data.current_observation;
          $rootScope.searchCityMainInfo.display_location.full = name;
        });
      getInfo.getWeatherForecastInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityForecastInfo = resp.data.forecast.simpleforecast.forecastday;
        });
      getInfo.getWeatherHourlyForecastInfo(loc)
        .then(function (resp) {
          $rootScope.searchHourlyForecastInfo = resp.data.hourly_forecast;
          var CheckTime = $rootScope.searchHourlyForecastInfo[0].FCTTIME.hour;
          console.log('res ' + CheckTime);
          $rootScope.mainStyle =  getStyle.getMainStyleByTime(CheckTime);
          $rootScope.buttonsStyle = getStyle.getButtonStyleByTime(CheckTime);
          $rootScope.hide();
        })
    }})
  .controller('cityCtrl', function ($scope, $rootScope) {
    $rootScope.addCityInList = function (name, lat, lon) {
      $rootScope.cityArray.push({
        name: name,
        loc: lat + ',' + lon
      });
      localStorage.setItem('cityList',JSON.stringify($rootScope.cityArray));
      console.log($rootScope.cityArray);
      alert('City successfully added!')
    };
    $rootScope.removeCity = function (loc) {
      $rootScope.cityArray.forEach(function (item, i, arr) {
        if(item.loc == loc){
          arr.splice(i, 1);
          localStorage.setItem('cityList', JSON.stringify(arr))
        }
      });
    }
  });
