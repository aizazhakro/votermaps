'use strict';

var windowObject = require('./window'),
    styleOptions = require('./mapStyleOptions'),
    remoteStorage = require('./remoteStorage'),
    uiManager = require('./googleMapsCustomUIMgr'),
    mapVisualizer = require('./googleMapsVisualizer');

var mapDOMElement = null;
var apiKey = '';
var mapScript = "//maps.googleapis.com/maps/api/js?libraries=visualization,geometry&key=" + apiKey + "&sensor=false&callback=";
var mapLoadedCallback = "initialize";

function getMapScript() {
    return mapScript + mapLoadedCallback;
}

function addScriptTag(scriptSource) {
    if (scriptSource) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptSource;
        document.body.appendChild(script);
    }
}

function mapInitialize() {
  var map = new google.maps.Map(mapDOMElement, styleOptions.mapOptions());
  remoteStorage.get('generated_districts.json').then(function(data) {
          mapVisualizer.visualizeDistrictsData(data, map, google.maps.event);
  }).catch(function(e) {
    console.log(e);
  });
  
  remoteStorage.get('generated_constituencies.json').then(function(data) {
          mapVisualizer.visualizeConstituencyData(data, map, google.maps.event);
  }).catch(function(e) {
    console.log(e);
  });
  
  uiManager.initialize(map);
  delete windowObject[mapLoadedCallback];
}


module.exports = {
    load : function(div) {
        mapDOMElement = div;
        windowObject[mapLoadedCallback] = mapInitialize;
        addScriptTag(getMapScript());
    }

};