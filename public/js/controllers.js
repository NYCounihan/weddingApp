'use strict';

/* Controllers */

var weddingControllers = angular.module('weddingControllers', []);

weddingControllers.controller('ScheduleCtrl',  function($scope) {
    $scope.MainTitle = "We’re Getting Married";
    $scope.SubTitle = "SATURDAY, 25<sup>th</sup> JULY 2015";
    $scope.moduleState = false;

    $scope.icons = {
          reception:  'images/circle_party_extrasmall.png',
          wedding: 'images/circle_heart_extrasmall.png',
          rehearsal: 'images/circle_pig_extrasmall.png'
    };

    $scope.lat = 40.7358726;
    $scope.lon = -73.9782909;

    $scope.mapWidth = "345px";
    $scope.mapHeight = "300px";

    $scope.markers = [];

    $scope.markers.push({
            "lat" : 40.7358726,
            "lon": -73.9939717,
            "title": 'Reception',
            "address": '14th Street & 5th Avenue',
            "marker": 'reception'
    });

    $scope.markers.push({
            "lat" : 40.76383,
            "lon": -73.969527,
            "title": 'Wedding',
            "address": '61st Street & Park Avenue',
            "marker": 'wedding'
    });

    $scope.markers.push({
            "lat" : 40.7017354,
            "lon": -73.9782909,
            "title": 'Friday BBQ',
            "address": 'Brooklyn Navy Yard, Building #3',
            "marker": 'rehearsal'
    });
        
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
    $scope.MainTitle = "Tips";
    $scope.SubTitle = "Fun things to do while you're here";
    $scope.moduleState = false;

    $scope.lat = 40.7358726;
    $scope.lon = -73.9782909;

    $scope.mapWidth = "700px";
    $scope.mapHeight = "200px";

    $scope.places = [];
    $scope.foods = [];
    $scope.drinks = [];

    $scope.icons = {
          food:  'images/map_food.png',
          place: 'images/map_place.png',
          drink: 'images/map_drink.png'
    };

    $scope.markers = [];

    var addMarker = function(lat, lon, title, address, marker, description){

        var id = $scope.markers.length;

        $scope.markers.push({
            "lat" : lat,
            "lon": lon,
            "title": title,
            "address": address,
            "marker": marker,
            "id" : id
        });

        switch (marker) {
            case "place": $scope.places.push({"id": id, "title" : title, "description" : description}); 
            case "food" : $scope.foods.push({"id": id, "title" : title, "description" : description}); 
            case "drink" : $scope.drinks.push({"id": id, "title" : title, "description" : description}); 
        }
    };

    addMarker(40.729233, -73.98451,'Momofuku','171 1st Avenue','food','delicious noodle shop where Emily and Julian went on their first date');

}); 

weddingControllers.controller('RSVPCtrl', ['$scope','$http','Guest', function($scope, $http, Guest) {
        $scope.formData = {};
        $scope.MainTitle = "RSVP";
        $scope.SubTitle = "Please RSVP by June 25th";
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
            var numUpdated = 0;
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
                    guest.Updated = arrayRow.Updated;
                    guest.Updated == true ? numUpdated++ : "";
                    numPeople++;
                });
            }

            $scope.numRehearsal = numRehearsal;
            $scope.numReception = numReception;
            $scope.numWedding = numWedding;
            $scope.numNotAttending = numNotAttending;
            $scope.numAttending = Math.max(numRehearsal,numReception,numWedding);
            $scope.numPeople = numPeople;
            $scope.numUpdated = numUpdated;
            $scope.percUpdated = Math.round((numUpdated / numPeople)*1000)/10;

            return newArray;

       }

        loadAllGuestDetails();

    }]);