var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
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
  });

  var icons = {
    reception: {
      name: 'reception',
      icon: 'images/circle_party_extrasmall.png'
    },
    wedding: {
      name: 'wedding',
      icon: 'images/circle_heart_extrasmall.png'
    },
    rehearsal: {
      name: 'rehearsal',
      icon: 'images/circle_pig_extrasmall.png'
    }
  };

  function addMarker(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
  }

  var features = [
    {
      position: new google.maps.LatLng(40.7358726,-73.9939717),
      type: 'reception'
    }, {
      position: new google.maps.LatLng(40.76383,-73.969527),
      type: 'wedding'
    }, {
      position:  new google.maps.LatLng(40.7178424,-73.9577271),
      type: 'rehearsal'
    }
  ];

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }

  var legend = document.getElementById('legend');
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

google.maps.event.addDomListener(window, 'load', initialize);
