'use strict';

/* Controllers */

var companyControllers = angular.module('companyControllers', []);

companyControllers.controller('CompanyListCtrl', ['$scope', 'Company',
  function($scope, Company) {
    $scope.formData = {};
    //alert('change scope via index');
    $scope.companies = Company.index();   

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createCompany = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.text != undefined) {
        // call the create function from our service (returns a promise object)
        Company.create($scope.formData);
        //alert('called create in controller');
      }

      $scope.companies = Company.index();  
    };

    // DELETE ==================================================================
    // delete a company  after checking it
    $scope.deleteCompany = function(id) {
      Company.delete(id);
      //alert('change scope delete');
      $scope.companies = Company.index();   
    };

}]); 

companyControllers.controller('CompanyDetailCtrl', ['$scope', '$routeParams', 'Company',
  function($scope, $routeParams, Company) {
    var companyDetail =  Company.query({CompanyName: $routeParams.CompanyName});
    //alert(company.CompanyName + "in detail controller");
    $scope.companyDetail = companyDetail; 
}]); 