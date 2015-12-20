var windowObject = require('./window'),
    gMapsLoader = require('./googleMapsLoader');


windowObject.initVoterMaps = function() {
    gMapsLoader.load(document.getElementById("map_canvas"));
}

