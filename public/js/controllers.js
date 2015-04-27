'use strict';

/* Controllers */

var weddingControllers = angular.module('weddingControllers', []);

weddingControllers.controller('ScheduleCtrl',  function($scope) {
    $scope.MainTitle = "We’re Getting Married";
    $scope.SubTitle = "SATURDAY, 25<sup>th</sup> JULY 2015";
}); 

weddingControllers.controller('RegistryCtrl',  function($scope) {
    $scope.MainTitle = "Registry :: please check back soon for updates";
    $scope.SubTitle = "A few great gift ideas";
}); 

weddingControllers.controller('HotelsCtrl',  function($scope) {
    $scope.MainTitle = "Hotels";
    $scope.SubTitle = "Great options listed below";
}); 

weddingControllers.controller('TravelCtrl',  function($scope) {
    $scope.MainTitle = "Travel :: please check back soon for updates";
    $scope.SubTitle = "Getting here & around while you're here";
}); 

weddingControllers.controller('TipsCtrl',  function($scope) {
    $scope.MainTitle = "Tips :: please check back soon for updates";
    $scope.SubTitle = "Fun things to do while you're here";
}); 

weddingControllers.controller('RSVPCtrl', ['$scope','$http','Guest', function($scope, $http, Guest) {
        $scope.formData = {};
        $scope.loading = true;

        $scope.MainTitle = "RSVP";
        $scope.SubTitle = "Please RSVP by June 15th";

        $scope.moduleState = 'login';

        // CREATE ==================================================================
        $scope.createGuest = function() {
            Guest.create($scope.formData);
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            $scope.moduleState = 'details';

            $scope.MainTitle = "Welcome " + id;
            $scope.SubTitle = "Please fill out the info below. See you soon!";
            $scope.guest = Guest.query({ GuestName: id });
        };

        // FIND GUEST ==================================================================
        $scope.findGuest = function() {
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            
            Guest.query({ GuestName: id },(function(data) {      
                $scope.moduleState = 'details';
                $scope.MainTitle = "Welcome " + id;
                $scope.SubTitle = "Please fill out the info below. See you soon!";
                $scope.guest = Guest.query({ GuestName: id });
            }));
        };

        // UPDATE ==================================================================
        $scope.updateGuest = function(id) {
            Guest.update($scope.guest);
            $scope.guest = Guest.query({ GuestName: id });  
        };

        // DELETE ==================================================================
        $scope.deleteGuest = function(id) {
            Guest.delete({ GuestName: id });  
        };

    }]);