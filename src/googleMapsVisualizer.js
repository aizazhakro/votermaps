'use strict';

var windowObject = require('./window'),
    styleOptions = require('./mapStyleOptions'),
    uiManager = require('./googleMapsCustomUIMgr');

var polygonDrawables = {};
var circleDrawables = {};

function onMouseOverPolygon() {
    var target = this;
    target.setOptions({
        fillOpacity: styleOptions.polygonSyleHighlight().fillOpacity,
        strokeOpacity: styleOptions.polygonSyleHighlight().strokeOpacity
    });
    uiManager.updateDetails(target.info);
};

function onMouseOutPolygon() { 
    var target = this;
    target.setOptions({
        fillOpacity: styleOptions.polygonSyle().fillOpacity,
        strokeOpacity: styleOptions.polygonSyle().strokeOpacity
    });
};
 
function onRightClickPolygon() { console.log('right click'); };
function onClickPolygon() { console.log('on click'); };

function onMouseOverCircle() {
    var target = this;
    target.setOptions({
        fillOpacity : styleOptions.circleStyleHighlight().fillOpacity,
        strokeOpacity : styleOptions.circleStyleHighlight().strokeOpacity,
        radius : target.getRadius() + styleOptions.circleStyleHighlight().radiusDelta
    });
    uiManager.updateDetails(target.info);
};

function onMouseOutCircle() {
    var target = this;
    target.setOptions({
        fillOpacity : styleOptions.circleStyle().fillOpacity,
        strokeOpacity : styleOptions.circleStyle().strokeOpacity,
        radius : target.getRadius() - styleOptions.circleStyle().radiusDelta
    });
};
 
function onRightClickCircle() {};
function onClickCircle() {};

var Events = {
    'MouseOver' : "mouseover",
    'MouseOut' : "mouseout",
    'RightClick' : "rightclick",
    'Click' : "click"
};

function worldDraw(drawables, context) {
    var timeout = 0;
    Object.keys(drawables).forEach(function(key) {
        setTimeout(function() {
            var drawable = drawables[key];
            drawable.renderNode.setMap(context);
        }, timeout);
        timeout = timeout + 0;
    });
};

module.exports = {
    visualizeDistrictsData: function(data, target, eventManager) {
        data.forEach(function(district) {
            var coordinatesArray = district.geometry.split(' ');
            var polygonBoundary = [];

            for (var ltlng = 0; ltlng < coordinatesArray.length; ltlng++) {
                var coordinates = coordinatesArray[ltlng].split(',');
                polygonBoundary.push({
                    lng: parseFloat(coordinates.shift()),
                    lat: parseFloat(coordinates.shift())
                    });
            }
            var polygon = new google.maps.Polygon({
                    paths: polygonBoundary,
                    strokeColor: styleOptions.polygonSyle().strokeColor,
                    strokeOpacity: styleOptions.polygonSyle().strokeOpacity,
                    strokeWeight: styleOptions.polygonSyle().strokeWeight,
                    fillColor: styleOptions.polygonSyle().fillColor,
                    fillOpacity: styleOptions.polygonSyle().fillOpacity
            });
            polygon.info = district.district;
            polygonDrawables[district.district] = {	'renderNode' : polygon,
                                                    'drawable' : district };

            eventManager.addListener(polygon, Events.MouseOver, onMouseOverPolygon);
            eventManager.addListener(polygon, Events.MouseOut, onMouseOutPolygon);
            eventManager.addListener(polygon, Events.RightClick, onRightClickPolygon);
            eventManager.addListener(polygon, Events.Click, onClickPolygon);
        });
        worldDraw(polygonDrawables, target);
    },

    visualizeConstituencyData : function(data, target, eventManager) {
        Object.keys(data).forEach(function(key) {
            var constituency = data[key];
            var coordinates = constituency.geometry.split(',');
            var circleCenter = {
                    lat: parseFloat(coordinates.shift()),
                    lng: parseFloat(coordinates.shift())
                    };

            var radius = styleOptions.circleStyle().radius;

            if ((constituency.Area.toUpperCase().indexOf('KARACHI') >= 0) ||
                (constituency.Area.toUpperCase().indexOf('LAHORE') >= 0) ||
                (constituency.Area.toUpperCase().indexOf('RAWALPINDI') >= 0) ) {
                        radius = styleOptions.circleStyle().highDensityRadius;
            }

            var circle = new google.maps.Circle({
                strokeColor: styleOptions.circleStyle().strokeColor,
                strokeOpacity: styleOptions.circleStyle().strokeOpacity,
                strokeWeight: styleOptions.circleStyle().strokeWeight,
                fillColor: styleOptions.circleStyle().fillColor,
                fillOpacity: styleOptions.circleStyle().fillOpacity,
                center: circleCenter,
                radius: radius,
                zIndex: google.maps.Marker.MAX_ZINDEX + 1
            });
            circle.info = key;
            circleDrawables[key] = {'renderNode' : circle,
                                    'drawable' : constituency };
            eventManager.addListener(circle, Events.MouseOver, onMouseOverCircle);
            eventManager.addListener(circle, Events.MouseOut, onMouseOutCircle);
            eventManager.addListener(circle, Events.RightClick, onRightClickCircle);
            eventManager.addListener(circle, Events.Click, onClickCircle);
        });

        worldDraw(circleDrawables, target);
    }
};