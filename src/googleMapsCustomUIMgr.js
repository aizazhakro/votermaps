'use strict';

var customControlsFactory = require('./customControlsFactory');

var detailsCustomControl = null;

module.exports = {
    initialize : function(target) {
        if (target) {
            target.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
                                                customControlsFactory.createAboutControl());
            target.controls[google.maps.ControlPosition.TOP_RIGHT].push(
                                                customControlsFactory.createSocialControls());
            target.controls[google.maps.ControlPosition.RIGHT_TOP].push(
                                                customControlsFactory.createHeatMapControls());
            target.controls[google.maps.ControlPosition.RIGHT_TOP].push(
                                                customControlsFactory.createDetailsControl());
        }
    },

    updateDetails : function(details) {
        var control = customControlsFactory.getDetailsControl();
        if (control) {
            control.innerHTML = details;
        }
    }

};





