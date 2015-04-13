'use strict';

/* App Module */

var weddingApp = angular.module('weddingApp', [
  'ngRoute',
  'weddingControllers'
]); 

weddingApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/schedule', {
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl'
      }).
      when('/rsvp', {
        templateUrl: 'partials/blank.html',
        controller: 'RSVPCtrl'
      }).
      when('/registry', {
        templateUrl: 'partials/blank.html',
        controller: 'RegistryCtrl'
      }).
      when('/hotels', {
        templateUrl: 'partials/hotels.html',
        controller: 'HotelsCtrl'
      }).
      when('/travel', {
        templateUrl: 'partials/blank.html',
        controller: 'TravelCtrl'
      }).
      when('/tips', {
        templateUrl: 'partials/blank.html',
        controller: 'TipsCtrl'
      }).
      when('/', {
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl'
      }).
      otherwise({
        redirectTo: '/',  
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);             
  }]); 

