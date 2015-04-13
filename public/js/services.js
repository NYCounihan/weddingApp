'use strict';

// ANGULAR SERVICES ======================================================================

var companyServices = angular.module('WeddingServices', ['ngResource']);

 companyServices.factory("Wedding", ['$resource',
	function($resource) {
  		return $resource("/api/companies/:CompanyName", { CompanyName : "@CompanyName" },
	    	{
      		'create':   { method: 'POST', params:{CompanyName:'@CompanyName'}},
      		'index':    { method: 'GET', isArray: true },
          //'query':    { method: 'GET', params:{CompanyName:'@CompanyName'}, transformResponse: function (data) {return { list : angular.fromJson(data) } }, isArray: true},
          'query':    { method: 'GET', params:{CompanyName:'@CompanyName'}, isArray: false},
      		'update':   { method: 'PUT' },
      		'delete':   { method: 'DELETE', params:{CompanyName:'Apple'} }
    		}
  		);
	}
  ]);
