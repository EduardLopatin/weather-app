// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      //CityList get
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      if(localStorage.getItem('cityList') == null){
        $rootScope.cityArray = [];
      }else {
        $rootScope.cityArray = JSON.parse(localStorage.getItem('cityList'))
      }
      //settings get
      if(localStorage.getItem('settings') == null){
        $rootScope.settings = {
          cel: true,
          far: true
        };

        localStorage.setItem('settings', JSON.stringify($rootScope.settings))
      }
      else {
        $rootScope.settings = JSON.parse(localStorage.getItem('settings'));
      }
      $state.transitionTo('app.main');
    })
  })
  .constant('myConst',
    {
      baseUrl:'http://api.wunderground.com/api/',
      apiKey: '0c1a01258e360c5e',
      url: 'https://api.wunderground.com/api/0c1a01258e360c5e/',
      main_param: 'conditions/q/',
      forecast_param: 'forecast/q/',
      hourly_param: 'hourly/q/'
    })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app',{
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })
      .state('app.main',{
        url: '/main',
        views:{
          'menuContent':{
            templateUrl:'templates/main.html',
            controller: 'mainCtrl'
          }
        }
      })
      .state('app.moreInfo', {
        url:'/moreInfo',
        views:{
          'menuContent':{
            templateUrl:'templates/moreInfo.html',
            controller:'moreInfoCtrl'
          }
        }
      })
      .state('app.search',{
        url: '/search',
        views:{
          'menuContent':{
            templateUrl: 'templates/search.html',
            controller: 'searchCtrl'
          }
        }
      })
      .state('app.cityList', {
        url: '/cityList',
        views: {
          'menuContent':{
            templateUrl: 'templates/cityList.html',
            controller: 'cityListCtrl'
          }
        }
      })
      .state('app.city', {
        url: '/city',
        views: {
          'menuContent':{
            templateUrl: 'templates/city.html',
            controller: 'cityCtrl'
          }
        }
      })

      .state('app.settings',{
        url:'/settings',
        views:{
          'menuContent':{
            templateUrl:'templates/settings.html',
            controller:'settingsCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('app/main');
  })
