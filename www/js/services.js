angular.module('starter.services', [])
  .factory('getInfo', function ($rootScope, $http, myConst) {

    function getWeatherMainInfo(place) {
      console.log('getWeatherMainInfo URL: ' + myConst.url + myConst.main_param + place + '.json');
      return $http.get(myConst.url + myConst.main_param + place + '.json')
      // return $http.get('../json/main.json')
    }
    function getWeatherForecastInfo(place) {
      console.log('getWeatherMoreInfo URL: ' + myConst.url + myConst.forecast_param + place + '.json');
      return $http.get(myConst.url + myConst.forecast_param + place + '.json')
      // return $http.get('../json/forecast.json');
    }
    function getWeatherHourlyForecastInfo(place) {
      console.log('getWeatherHourlyInfo URL: ' + myConst.url + myConst.hourly_param + place + '.json');
      return $http.get(myConst.url + myConst.hourly_param + place + '.json')
      // return $http.get('../json/hourlyForecast.json');
    }
    return {
      getWeatherMainInfo: getWeatherMainInfo,
      getWeatherForecastInfo: getWeatherForecastInfo,
      getWeatherHourlyForecastInfo: getWeatherHourlyForecastInfo
    }
  })
