# VoterMaps #

This README documents build and setup instructions to run the VoterMaps WebApp.

### Quick summary ###
This Repository contains part of the VoterMaps web application (http://votermaps.appspot.com). This repository contains the code which interacts with Google Maps along with the GIS data so that anyone trying to build a similar app can start with this sample instead of starting from scratch. 


## How do I get set up? ##

### Summary of set up ###
VoterMaps is a Javascript front-end web application. VoterMaps uses Google Maps Javascript library. You can learn more about the Google Maps Javascript library at https://developers.google.com/maps/documentation/javascript

### Configuration ###
You will need npm (https://nodejs.org) v2.14.7 and node v4.2.2 or higher. 

### Dependencies ###
    "bluebird": "^3.0.5",
    "request": "^2.67.0",
    "browserify": "^12.0.1",
    "local-web-server": "^0.5.24",
    "promise": "^7.0.4",
    "uglify-js": "^2.6.1",
    "watchify": "^3.6.1"    
	
### Build instructions ###

Install dependencies using:

    npm install

Build the app using: 

    npm run build

Run the app locally (http://localhost:8001/app.html) using:

    npm run run

### API Key ###
You will need a Google Maps API Key in order to run the app for production. The API key is used in googleMapsLoader.js file.