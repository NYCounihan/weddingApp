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
        $scope.MainTitle = "RSVP";
        $scope.SubTitle = "Please RSVP by June 15th";
        $scope.moduleState = "login";


        // CREATE ==================================================================
        $scope.createGuest = function() {
            $scope.moduleState = "loading";
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            Guest.create($scope.formData);
            loadGuestDetails(id, "Please fill out the info below. See you soon!");
        };

        // FIND GUEST ==================================================================
        $scope.findGuest = function() {
            $scope.moduleState = "loading";
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            loadGuestDetails({ GuestName: id }, "Please fill out the info below. See you soon!");
        };

        // UPDATE ==================================================================
        $scope.updateGuest = function(id) {
            $scope.moduleState = "loading";
            Guest.update($scope.guest,(function(success){
                if (success) {
                    loadGuestDetails({ GuestName: id },"Thanks for updating!");
                }
                else {
                    $scope.SubTitle = "Unable to update. Please try again";
                };
               
            }));
        };

        // DELETE ==================================================================
        $scope.deleteGuest = function(id) {
            $scope.moduleState = "loading";
            Guest.delete({ GuestName: id });  
            $scope.moduleState = "login";
        };

        var setGuestForm = function(number) {
            if (number > 0) {
                $scope.moduleGuest = "Yes";
            }
            else{
                $scope.moduleGuest = "No";
            }

        }

        var loadGuestDetails = function(name, status){
            Guest.query(name,(function(data) {

                if(data.GuestName == undefined){
                    $scope.moduleState = 'login';
                    $scope.SubTitle = "Whoops! Unable to find that name.";
                }
                else
                {
                    console.log(data.GuestName + " guest name returned to loadGuestDetails");
                    $scope.MainTitle = "Welcome " + data.GuestFirstName;
                    $scope.SubTitle = status; 
                    $scope.guest = data;
                    setGuestForm(data.GuestsAllowed);
                    $scope.moduleState = 'details';
                }

            })); 
        }

    }]);