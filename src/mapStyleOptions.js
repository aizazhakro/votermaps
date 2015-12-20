'use strict';

var polygonStrokeColor = '#000000';
var polygonStrokeOpacity = 0.2;
var polygonStrokeOpacityHighlight = 1;
var polygonFillOpacity = 0.1;
var polygonFillOpacityHigh = 0.50;
var polygonFillOpacityHighlight = 0.65;
var polygonFillColor = "#00FF00";
var polygonStrokeWeight = 1;
var polygonStrokeWeightHighLight = 5;
var circleRadius = 6000;
var circleRadiusHighlightDelta = 2000;
var circleHighDensityRadius = 2000;
var circleHighDensityRadiusHighlight = 3000;
var circleFillOpacity = 0.85;
var circleFillOpacityHighlight = 0.35;
var circleStrokeColor = '#104E8B';
var circleStrokeOpacity = polygonFillOpacityHigh;
var circleStrokeWeight = 3;
var circleFillColor = "#FF0000";
var highlightStroke = 0.0;
var zoomLevel = 7;
var enablePanControl = true;
var enableZoomControl = true;
var enableMapTypeControl = false;
var enableScaleControl = false;
var enableStreetViewControl = false;
var enableOverviewMapControl = false;

module.exports = {
    mapOptions : function() {
        return {
            zoom: zoomLevel,
            center: new google.maps.LatLng(29.674625133416615, 69.400103515625),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: enablePanControl,
            zoomControl: enableZoomControl,
            mapTypeControl: enableMapTypeControl,
            scaleControl: enableScaleControl,
            streetViewControl: enableStreetViewControl,
            overviewMapControl: enableOverviewMapControl
        }
    },

    circleStyle : function() {
        return {
            strokeColor: circleStrokeColor,
            strokeOpacity: circleStrokeOpacity,
            strokeWeight: circleStrokeWeight,
            fillColor: circleFillColor,
            fillOpacity: circleFillOpacity,
            radius : circleRadius,
            highDensityRadius : circleHighDensityRadius,
            radiusDelta : circleRadiusHighlightDelta
        }
    },

    circleStyleHighlight : function() {
        return {
            fillOpacity: circleFillOpacityHighlight,
            radiusDelta : circleRadiusHighlightDelta,
        }
    },

    polygonSyle : function() {
        return {
            strokeColor: polygonStrokeColor,
            strokeOpacity: polygonStrokeOpacity,
            strokeWeight: polygonStrokeWeight,
            fillColor: polygonFillColor,
            fillOpacity: polygonFillOpacity
        }
    },

    polygonSyleHighlight : function() {
        return {
            strokeOpacity: polygonStrokeOpacityHighlight,
            fillOpacity: polygonFillOpacityHighlight
        }
    }
}
