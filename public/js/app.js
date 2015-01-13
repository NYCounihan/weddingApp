'use strict';

/* App Module */

var companyApp = angular.module('companyApp', [
  'ngRoute',
  'companyControllers',
  'companyServices'
  //'ngGrid'
]); 

companyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/company-list.html',
        controller: 'CompanyListCtrl'
      }).
      when('/companies/:CompanyName', {
        templateUrl: 'partials/company-detail.html',
        controller: 'CompanyDetailCtrl'
      }).
      otherwise({
        redirectTo: '/',  
        templateUrl: 'partials/company-list.html',
        controller: 'CompanyListCtrl'
      });                
  }]); 

