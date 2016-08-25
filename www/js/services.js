angular.module('starter.services', [])
  .factory('getInfo', function ($rootScope, $http, myConst) {

    function getWeatherMainInfo(place) {
      console.log('getWeatherMainInfo URL: ' + myConst.url + myConst.main_param + place + '.json');
      // return $http.get(myConst.url + myConst.main_param + place + '.json')
      return $http.get('../json/main.json')
    }
    function getWeatherForecastInfo(place) {
      console.log('getWeatherMoreInfo URL: ' + myConst.url + myConst.forecast_param + place + '.json');
      // return $http.get(myConst.url + myConst.forecast_param + place + '.json')
      return $http.get('../json/forecast.json');
    }
    function getWeatherHourlyForecastInfo(place) {
      console.log('getWeatherHourlyInfo URL: ' + myConst.url + myConst.hourly_param + place + '.json');
      // return $http.get(myConst.url + myConst.hourly_param + place + '.json')
      return $http.get('../json/hourlyForecast.json');
    }
    return {
      getWeatherMainInfo: getWeatherMainInfo,
      getWeatherForecastInfo: getWeatherForecastInfo,
      getWeatherHourlyForecastInfo: getWeatherHourlyForecastInfo
    }
  })
  .factory('getSearch', function($rootScope, $http){

    function getAuto(searchVar){
      searchVar = searchVar.replace(/ /g, "&ensp;");
      console.log("http://autocomplete.wunderground.com/aq?query=" + searchVar);
      return $http.get("http://autocomplete.wunderground.com/aq?query=" + searchVar);
    }
    function getInput(searchVar)
    {
      console.log('searchGet:'+searchVar);
      if(searchVar.length >= 3)
        getAuto(searchVar)
          .then(function (resp) {
            $rootScope.searchRes = resp.data.RESULTS;
            $rootScope.infoIndex = true;
          });
      else {
        $rootScope.searchRes = null;
        $rootScope.infoIndex = false;
      }
    }
    return{
      getInput: getInput
    }
  })
  .factory('arrayFilter', function () {
    function getPosition(array, position) {
      return array.filter(function (array, pos) {
        if (pos % position == 0){
          return array
        }
      })
    }
    return {
      getPosition: getPosition
    }
  });
