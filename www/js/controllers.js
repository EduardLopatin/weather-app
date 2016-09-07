angular.module('starter.controllers',[])
  .controller('mainCtrl', function ($rootScope, $cordovaGeolocation, myConst, getInfo, $ionicHistory) {
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
    $rootScope.getMoreInfo = function (lat, lon) {
      var loc = lat + ',' + lon;
      getInfo.getWeatherHourlyForecastInfo(loc)
        .then(
          function (resp) {
            $rootScope.hourlyForecastInfo = resp.data.hourly_forecast;
            console.log('hourlyForecastInfo: ' + $rootScope.hourlyForecastInfo);
          }
        )
    };
  })
  .controller('searchCtrl', function ($rootScope, getSearch, getInfo) {
    $rootScope.getSearchInput = function (search) {
      getSearch.getInput(search);
    };
    $rootScope.getSearchCityInfo = function(lat, lon, name){
      var loc = lat + ',' + lon;
      console.log(loc);
      getInfo.getWeatherMainInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityMainInfo = resp.data.current_observation;
          $rootScope.searchCityMainInfo.display_location.full = name;
        });
      getInfo.getWeatherForecastInfo(loc)
        .then(function (resp) {
          $rootScope.searchCityMoreInfo = resp.data;
        })
    }

  })
  .controller('cityListCtrl', function ($rootScope, getInfo) {
  $rootScope.showCity = function (loc, name) {
    getInfo.getWeatherMainInfo(loc)
      .then(function (resp) {
        $rootScope.searchCityMainInfo = resp.data.current_observation;
        $rootScope.searchCityMainInfo.display_location.full = name;
      });
    getInfo.getWeatherForecastInfo(loc)
      .then(function (resp) {
        $rootScope.searchCityMoreInfo = resp.data;
      })
  }
  $rootScope.removeCity = function(loc) {
    $rootScope.cityArray.forEach(function (item,index) {
      if(item.loc = loc){
        $rootScope.cityArray.splice(index,1);
        localStorage.setItem('cityList', JSON.stringify($rootScope.cityArray))
      }
    })
  }
  })
  .controller('cityCtrl', function ($scope, $rootScope) {
    $rootScope.addCityInList = function (name, lat, lon) {
        $rootScope.cityArray.push({
          name: name,
          loc: lat + ',' + lon
        });
      localStorage.setItem('cityList',JSON.stringify($rootScope.cityArray));
      console.log($rootScope.cityArray);
      $rootScope.cityArray.forEach(function (item, i , arr) {
       if(item.name == name){
         console.log('eye!');
         return true;
       }
      })
    }
  })

  .controller('settingsCtrl', function ($rootScope) {
$rootScope.changeCel = function ($rootScope) {
  $rootScope.settings = []
}
  });
