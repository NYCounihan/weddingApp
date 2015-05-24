'use strict';

/* Directives */

var weddingApp = angular.module('weddingApp');

weddingApp.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
          zoom: 12,
          center: new google.maps.LatLng(40.7414248,-73.9707823),
          panControl: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [ { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi.government", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi.medical", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi.place_of_worship", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi.school", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" }, { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road" } ]
        };

        var icons = {
          reception:  'images/circle_party_extrasmall.png',
          wedding: 'images/circle_heart_extrasmall.png',
          rehearsal: 'images/circle_pig_extrasmall.png'
        };

        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content, iconType) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: icons[iconType]
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        // show the map and place some markers
        initMap();

        google.maps.event.addListener(map, 'tilesloaded', function(){
            //this part runs when the mapobject is created and rendered
            scope.moduleState = true;
            scope.$apply();
        });
        
        setMarker(map, new google.maps.LatLng(40.7358726,-73.9939717), 'Reception', '14th Street & 5th Avenue', 'reception');
        setMarker(map, new google.maps.LatLng(40.76383,-73.969527), 'Wedding', '61st Street & Park Avenue', 'wedding');
        setMarker(map, new google.maps.LatLng(40.7178424,-73.9577271), 'Rehearsal', 'Location still TBD!', 'rehearsal');

    };

    return {
        restrict: 'A',
        scope: false,
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});

weddingApp.directive('visible', function() {

    return {
        restrict: 'A',

        link: function(scope, element, attributes) {
            scope.$watch(attributes.visible, function(value){
            element.css('visibility', value ? 'visible' : 'hidden');
        });
    }
  };
});