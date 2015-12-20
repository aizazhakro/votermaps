'use strict';

var featureToggles = require('./featureToggles');

var ResourceManager = {
    GenieIcon : '/res/genie_star.png'
};

var detailsControl = null;

function getDetailHTMLForPolygon(polygon) {
    var controlStyleBegin = '<div class="div_ctrl_level0">' + 
                            '<div class="div_ctrl_level1">' +         
                            '<div class="div_ctrl_level2">';
    
    var controlHtml =   '<div>Please select a <strong>distrct</strong></div><div>or <strong>NA Seat</strong>(circle) to begin</div>';   
    
    //computed_bounds
    var controlStyleEnd = '</div></div></div>';
    return controlStyleBegin + controlHtml + controlStyleEnd;
}



module.exports = {
    createAboutControl : function() {
        var controlDiv = document.createElement('div');
        controlDiv.innerHTML = '<div style="font-family : Arial,sans-serif; font-size : 14px; color : white; background-color: green;">votermaps.appspot.com</div>';
        return controlDiv;
    },

    createSocialControls : function() {
        var fb_like_btn = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FVotermaps&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=152136251622196" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height: 20px;" allowTransparency="true"></iframe>';
        var tw_follow_btn = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/follow_button.html?screen_name=VoterMaps&show_count=false&show_screen_name=false" style="width:60px; height:20px;"></iframe>';
        var about_btn = '<a style="padding-left : 5px; border : none;"  target="_blank" href="/home.html"><img src="/res/about_clip.png" height="24"/></a>';

        var controlDiv = document.createElement('div');

        // Set CSS styles for the DIV containing the control
        // Setting padding to 5 px will offset the control
        // from the edge of the map.
        controlDiv.style.padding = '5px';
        //controlDiv.style.display = 'none';
        controlDiv.setAttribute('id', "_custom_about_control_0");

        controlDiv.innerHTML = '<table >' +
        '<tr><div style="padding-top=50px">' +
        '<td>'+fb_like_btn+'<td>' +
        '<td>'+tw_follow_btn+'</td>' +
        '<td>' + about_btn + '</td>' +
        '</div></tr></table>';
        return controlDiv;
    },

    createHeatMapControls : function() {
        var controlStyleBegin =	'<div class="div_ctrl_level0">' +
                                '<div class="div_ctrl_level1">' +
                                '<div class="div_ctrl_level2">' +
                                '<div class="vertical_red_green_gradient"></div>' +
                                '<div class="wrapper_div">' +
                                '<div class="left_div">High</div>' +
                                '<div class="right_div">Low</div>' +
                                '</div>';

        // voter density effect
        var controlHtml = '';

        controlHtml = '<fieldset style="width: 100%x; border: 1px solid gray; text-align : left;">';
        controlHtml = controlHtml + '<legend><strong>Density Filters</strong></legend>';

        // voter density
        controlHtml =	controlHtml + '<div class="effect_div"><input type="checkbox" id="idVoterDensity" name="idVoterDensity" onclick="toggleVoterDensity()" style="text-align:center; vertical-align:middle" ';
        if (featureToggles.Effects.VoterDensity) {
            controlHtml = controlHtml + ' checked="true" >';
        }
        controlHtml = controlHtml + 'Voters</input></div>';

        controlHtml = controlHtml + '<div><input disabled="true" id="all" onclick="onClickAllVoters()" type="radio" name="sex" value="male">All</input>';
        controlHtml = controlHtml + '<input disabled="true" id="male" onclick="onClickMaleVoters()" type="radio" name="sex" value="male">M</input>';
        controlHtml = controlHtml + '<input disabled="true" id="female" onclick="onClickFemaleVoters()" type="radio" name="sex"  value="female">F</input></div>';

        // population density

        controlHtml =	controlHtml + '<div class="effect_div"><input type="checkbox" id="idPopulationDensity" name="idPopulationDensity" onclick="togglePopulationDensity()" style="text-align:center; vertical-align:middle" ';
        if (featureToggles.Effects.PopulationDensity) {
            controlHtml = controlHtml + ' checked="true"';
        }

        controlHtml = controlHtml + '>Population</input></div>';

        // area (kms) density

        controlHtml =	controlHtml + '<div class="effect_div"><input type="checkbox" id="idKmsDensity" name="idKmsDensity" onclick="toggleKmsDensity()" style="text-align:center; vertical-align:middle" ';
        if (featureToggles.Effects.KmsDensity) {
            controlHtml = controlHtml + ' checked="true"';
        }
        controlHtml = controlHtml + '>Area</input></div>';

        controlHtml = controlHtml + '</fieldset>';
        var ht=	'<table class="legend_table">' +
                    '<tr>' +
                        '<td class="legend_icon"><img src="/res/const_legend.png" width="16"/></td>' +
                        '<td class="legend_desc">Constituency</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="legend_icon"><img src="/res/district_legend.png" width="16"/></td>' +
                        '<td class="legend_desc">District</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="legend_icon"><img src="' + ResourceManager.GenieIcon + '" width="16"/></td>' +
                        '<td class="legend_desc">Stats Genie</td>' +
                    '</tr>' +
                '</table>';
        // <a href="http://photobucket.com/images/animated%20stars" target="_blank"><img src="http://i269.photobucket.com/albums/jj48/88prince/ANIMATED-STARS_BHL_03.gif" border="0" alt="animated stars photo: star ANIMATED-STARS_BHL_03.gif"/></a>
        var controlStyleEnd = ht + '</div></div></div>';
        var finalCustomControlInnerHTML = controlStyleBegin + controlHtml + controlStyleEnd;


        var controlDiv = document.createElement('div');

        // Set CSS styles for the DIV containing the control
        // Setting padding to 5 px will offset the control
        // from the edge of the map.
        controlDiv.style.paddingTop = '10px';
        controlDiv.style.paddingRight = '6px';
        //controlDiv.style.display = 'none';
        controlDiv.setAttribute('id', '_heatmap_custom_control_level_0');

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'white';
        controlUI.style.borderStyle = 'solid';
        controlUI.style.borderWidth = '1px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlUI.title = '';
        controlUI.setAttribute('id', '_heatmap_custom_control_level_1' );
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '13px';
        controlText.style.paddingLeft = '4px';
        controlText.style.paddingRight = '4px';
        controlText.style.paddingTop = '2px';
        controlText.style.paddingBottom = '2px';
        controlText.style.color = "black";
        controlText.setAttribute('id', '_heatmap_custom_control_level_2');
        controlText.innerHTML = finalCustomControlInnerHTML;
        controlUI.appendChild(controlText);

        return controlDiv;
    },

    createDetailsControl : function(dataObject) {

        /* Test HTML for the Google Maps style control
        * <div style="padding : 5px;">
            <div style="background-color : white; border-style=solid; border-width : 2px; text-align : center">
                <div style="font-family : Arial,sans-serif; font-size : 50px; padding-left : 4px ; padding-right : 4px; color : black">
                <strong>Hello DIV</strong>
                </div>
            </div>
        </div>
        */
        // Create a div to hold the control.
        var controlDiv = document.createElement('div');

        // Set CSS styles for the DIV containing the control
        // Setting padding to 5 px will offset the control
        // from the edge of the map.
        controlDiv.style.paddingTop = '5px';
        controlDiv.style.paddingRight = '6px';
        controlDiv.setAttribute('id', '_district_detail_level0');
        //class="div_t"
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'white';
        controlUI.style.borderStyle = 'solid';
        controlUI.style.borderWidth = '1px';
        controlUI.style.cursor = 'pointer';
        controlUI.title = '';
        controlUI.setAttribute('id', '_district_detail_level1' );
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '13px';
        controlText.style.paddingLeft = '4px';
        controlText.style.paddingRight = '4px';
        controlText.style.paddingTop = '2px';
        controlText.style.paddingBottom = '2px';
        controlText.style.color = "black";
        controlText.setAttribute('id', '_district_detail_level2');
        controlText.innerHTML = getDetailHTMLForPolygon(null);
        detailsControl = controlText;
        controlUI.appendChild(controlText);

        return controlDiv;
    },

    getDetailsControl : function() {
        return detailsControl;
    }
};