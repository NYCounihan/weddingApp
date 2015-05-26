'use strict';

/* Controllers */

var weddingControllers = angular.module('weddingControllers', []);

weddingControllers.controller('ScheduleCtrl',  function($scope) {
    $scope.MainTitle = "We’re Getting Married";
    $scope.SubTitle = "SATURDAY, 25<sup>th</sup> JULY 2015";
    $scope.moduleState = false;
}); 

weddingControllers.controller('RegistryCtrl',  function($scope) {
    $scope.MainTitle = "Registry";
    $scope.SubTitle = "A few great gift ideas below.";
}); 

weddingControllers.controller('HotelsCtrl',  function($scope) {
    $scope.MainTitle = "Hotels";
    $scope.SubTitle = "Great options listed below";
}); 

weddingControllers.controller('TravelCtrl',  function($scope) {
    $scope.MainTitle = "Travel";
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
        $scope.buttonName = "rsvp";


        // FIND GUEST ==================================================================
        $scope.findGuest = function() {
            $scope.moduleState = "loading";
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            loadGuestDetails({ GuestName: id }, "Please fill out the info below. See you soon!");
        };

        // UPDATE ==================================================================
        $scope.updateGuest = function(id) {
            $scope.moduleState = "loading";

            //updateGuestFullNames();
            id = $scope.guest.guestNames[0].GuestFirstName + " " + $scope.guest.guestNames[0].GuestLastName;

            Guest.update($scope.guest,(function(success){
                if (success) {
                    loadGuestDetails({ GuestName: id },"Thanks for updating!");
                }
                else {
                    $scope.SubTitle = "Unable to update. Please try again";
                };
               
            }));
        };


        var loadGuestDetails = function(name, status){
            Guest.query(name,(function(data) {

                if(data.guestNames == undefined){
                    $scope.moduleState = 'login';
                    $scope.SubTitle = "Whoops! Technical difficulties. Email juliancounihan@gmail.com";
                }
                else
                {
                    console.log(data.guestNames[0].GuestName + " guest name returned to loadGuestDetails");
                    $scope.MainTitle = "Welcome";
                    $scope.SubTitle = status; 
                    $scope.guest = data;
                    $scope.moduleState = 'details';
                }

            })); 
        }

        $scope.attendDetails = function(){
            console.log("entered attendDetails()");
            console.log($scope.guest.RehearsalAttending);
            console.log($scope.guest.WeddingAttending);
            console.log($scope.guest.ReceptionAttending);

            if ($scope.guest.RehearsalAttending || $scope.guest.WeddingAttending || $scope.guest.ReceptionAttending){
                $scope.showAttendDetails = true;
            }
            else{
                $scope.showAttendDetails = false;
            }

        }

        var updateGuestFullNames = function(){
            for(var i=0; i<$scope.guest.guestNames.length; i++) {
             $scope.guest.guestNames[i].GuestName = $scope.guest.guestNames[i].GuestFirstName + ' ' + $scope.guest.guestNames[i].GuestLastName;
            }
        }

    }]);

weddingControllers.controller('AdminCtrl', ['$scope', '$route', '$http','Guest', function($scope, $route, $http, Guest) {
        
        $scope.formData = {};
        $scope.MainTitle = "Admin";
        $scope.SubTitle = "Emily is the best";
        $scope.flattenData = false;
        if($route.current.flattenData == "true"){$scope.flattenData = true;}

        // CREATE ==================================================================
        $scope.createGuest = function(newRow) {

            $scope.formData = {};

            Guest.create(newRow, (function(success){
                if (success) {
                    $scope.SubTitle = newRow.GuestFirstName + " added";
                    loadAllGuestDetails();
                }
                else {
                    $scope.MainTitle = "Admin";
                    $scope.SubTitle = "Unable to update. Please try again";
                    loadAllGuestDetails();
                }
            }));
        };

        // FIND GUEST ==================================================================
        $scope.findGuest = function() {
            $scope.moduleState = "loading";
            var id = $scope.formData.GuestFirstName + ' ' + $scope.formData.GuestLastName;
            loadGuestDetails({ GuestName: id }, "Please fill out the info below. See you soon!");
        };

        // UPDATE ==================================================================
        $scope.updateGuest = function(guestRow) {

            Guest.update(guestRow,(function(success){
                if (success) {
                    loadAllGuestDetails();
                }
                else {
                    $scope.SubTitle = "Unable to update. Please try again";
                    loadAllGuestDetails();
                };
               
            }));
        };

        // DELETE ==================================================================
        $scope.deleteGuest = function(id) {
            Guest.delete({ GuestName: id });
            console.log('in controller about to delete ' + id);
            loadAllGuestDetails();  
        };

        // DELETE LAST GUEST =======================================================
        $scope.deleteLastGuest = function(guestRow) {
            guestRow.guestNames.pop();
            $scope.updateGuest(guestRow);  
        };

        $scope.addGuest = function(guestRow){
            var obj = {GuestFirstName:"", GuestLastName:""};
            guestRow.guestNames.push(obj);
            $scope.updateGuest(guestRow);
        }

        var loadAllGuestDetails = function(){
            $scope.moduleState = "loading";

            Guest.queryAll((function(data) {

                if(data == undefined){
                    console.log("error : could not load guests");
                }
                else
                {
                 
                    if ($scope.flattenData){
                        console.log('flattening data');
                        data = flattenArray(data);
                        console.log(data);
                    }

                    $scope.guest = data;
                    $scope.moduleState = "ready";
                }

            })); 
        }

       var flattenArray = function(array){
            var newArray = [];
            var numRehearsal = 0;
            var numReception = 0;
            var numWedding = 0;
            var numNotAttending = 0;
            var numPeople = 0;

            for(var i=0;i<array.length;i++){

                var arrayRow = [];
                arrayRow = array[i];

                arrayRow.guestNames.forEach(function(guest){
                    if(guest.GuestName == "" || guest.GuestName == " " || guest.GuestName == null){
                        guest.GuestName = "Guest of " + newArray[newArray.length - 1].GuestName;
                    }

                    console.log('name is :' + guest.GuestName + "</end name>");

                    newArray.push(guest);


                    guest.RehearsalAttending == true ? numRehearsal++ : "";
                    guest.ReceptionAttending == true ? numReception++ : "";
                    guest.WeddingAttending == true ? numWedding++ : "";
                    guest.NotAttending == true ? numNotAttending++ : "";
                    numPeople++;
                });
            }

            $scope.numRehearsal = numRehearsal;
            $scope.numReception = numReception;
            $scope.numWedding = numWedding;
            $scope.numNotAttending = numNotAttending;
            $scope.numAttending = Math.max(numRehearsal,numReception,numWedding);
            $scope.numPeople = numPeople;

            return newArray;

       }

        loadAllGuestDetails();

    }]);