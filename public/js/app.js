'use strict';

/* App Module */

var weddingApp = angular.module('weddingApp', [
  'ngRoute',
  'weddingControllers',
  'weddingService'
]); 

weddingApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/schedule', {
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl'
      }).
      when('/rsvp', {
        templateUrl: 'partials/rsvp.html',
        controller: 'RSVPCtrl'
      }).
       when('/guestdetails', {
        templateUrl: 'partials/guestdetails.html',
        controller: 'GuestDetailsCtrl'
      }).
      when('/registry', {
        templateUrl: 'partials/registry.html',
        controller: 'RegistryCtrl'
      }).
      when('/hotels', {
        templateUrl: 'partials/hotels.html',
        controller: 'HotelsCtrl'
      }).
      when('/travel', {
        templateUrl: 'partials/travel.html',
        controller: 'TravelCtrl'
      }).
      when('/tips', {
        templateUrl: 'partials/tips.html',
        controller: 'TipsCtrl'
      }).
      when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'AdminCtrl'
      }).
      when('/admintable', {
        templateUrl: 'partials/admintable.html',
        controller: 'AdminCtrl',
        flattenData: 'true'
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

weddingApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);