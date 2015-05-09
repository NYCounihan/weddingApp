'use strict';

// ANGULAR SERVICES ======================================================================

var companyServices = angular.module('weddingService', ['ngResource']);

 companyServices.factory("Guest", ['$resource',
	function($resource) {
  		return $resource("/api/guests/:GuestName", { GuestName : "@GuestName" },
	    	{
      		//'create':   { method: 'POST', params:{GuestName:'@GuestName'}},
          'create':   { method: 'POST', isArray: true},
      		'index':    { method: 'GET', isArray: true },
          //'query':    { method: 'GET', params:{CompanyName:'@CompanyName'}, transformResponse: function (data) {return { list : angular.fromJson(data) } }, isArray: true},
          'query':    { method: 'GET', params:{GuestName:'@GuestName'}},
          'queryAll':    { method: 'GET', isArray: true},
      		'update':   { method: 'PUT' },
      		'delete':   { method: 'DELETE', params:{GuestName:'@GuestName'}, isArray: false}
    		}
        
  		)
	}
  ]);