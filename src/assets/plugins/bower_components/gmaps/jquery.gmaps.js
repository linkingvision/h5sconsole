$(document).ready(function () {
    // Simple map
    map = new GMaps({
        el: '#gmaps-simple',
        lat: 34.05,
        lng: -78.72,
        zoom: 5,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });
});

// Marker Map



// Styled Map
$(document).ready(function () {

    var map = new GMaps({
        el: "#styledmap",
        lat: 41.895465,
        lng: 12.482324,
        zoom: 5,
        zoomControl: true,
        zoomControlOpt: {
            style: "SMALL",
            position: "TOP_LEFT"
        },
        panControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });

    var styles = [
        {
            stylers: [
                {
                    hue: "#6164c1"
                },
                {
                    saturation: 20
                }
              ]
            }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 200
                },
                {
                    visibility: "simplified"
                }
              ]
            }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
              ]
            }
        ];

    map.addStyle({
        styledMapName: "Styled Map",
        styles: styles,
        mapTypeId: "map_style"
    });

    map.setStyle("map_style");
});
