var featuresCritical = [];
var featuresMajor = [];
var featuresMinor = [];
var featuresOk = [];

var criticalStyle = createStyle('rgba(255, 0, 0, 0.7)');
var majorStyle = createStyle('rgba(255, 153, 0, 0.7)');
var minorStyle = createStyle('rgba(255, 255, 0, 0.7)');
var okStyle = createStyle('rgba(102, 255, 51, 0.7)');

var map = new ol.Map({});

function displayMap() {

    generateFeatures();

    generateLayers();

    generateMap();
};

function generateLayers() {

    var vectorLayerCritical = createLayer(featuresCritical, critical, 3);
    var vectorLayerMajor = createLayer(featuresMajor, major, 2);
    var vectorLayerMinor = createLayer(featuresMinor, minor, 1);
    var vectorLayerOk = createLayer(featuresOk, critical, 0);
    var layer = new ol.layer.Tile
    ({
        source: new ol.source.OSM()
    });

    map.addLayer(layer);
    map.addLayer(vectorLayerCritical);
    map.addLayer(vectorLayerMajor);
    map.addLayer(vectorLayerMinor);
    map.addLayer(vectorLayerOk);
}

function generateMap() {
    map.setTarget('map');
    map.setView(new ol.View({
        center: [0, 0],
        zoom: 2
    }));
}

function generateFeatures() {

    for (var i = 0; i < points.length; i++) {

        var obj = points[i];
        var coordinates = ol.proj.fromLonLat([obj['longitude'], obj['latitude']]);
        var feature = new ol.Feature(new ol.geom.Point(coordinates));
        var state = obj['state'];

        if(state == 'critical') {
            critical(feature);
        } else if(state == 'major') {
            major(feature);
        } else if(state == 'minor') {
            minor(feature);
        } else if(state == 'ok') {
            ok(feature);
        } else {
            alert("Unknown value !!!");
        }
    }
}

function critical(feature) {
    feature.setStyle(criticalStyle);
    featuresCritical.push(feature);
    addAnimation(feature);
}

function major(feature) {
    feature.setStyle(majorStyle);
    featuresMajor.push(feature);
}

function minor(feature) {
    feature.setStyle(minorStyle);
    featuresMinor.push(feature);
}

function ok(feature) {
    feature.setStyle(okStyle);
    featuresOk.push(feature);
}

function createStyle(color) {

    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 8,
            stroke: new ol.style.Stroke({
              color: color
            }),
            fill: new ol.style.Fill({
              color: color
            })
        })
    });

    return style;
};

function createLayer(features, style, zIndex) {

    var source = new ol.source.Vector({
      features: features
    });

    var vectorLayer = new ol.layer.Vector({
      source: source
    });
    vectorLayer.setZIndex(zIndex);

    return vectorLayer;
}

// ANIMATED OVERLAY

function addAnimation(feature) {
  var coordinates = feature.getGeometry().getCoordinates();
  var overlay = generateOverlay(coordinates);
  map.addOverlay(overlay);
}

function generateOverlay(coordinates) {
  var element = document.createElement('div');
  element.setAttribute('class', 'pulsate');
  return new ol.Overlay({
    element: element,
    position: coordinates,
    positioning: 'center-center',
    offset: [1, 1]
  });
}

function flash(feature) {

    var duration = 3000;
    var start = new Date().getTime();
    var listenerKey;

    function animate(event) {
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / duration;
        var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
        var opacity = ol.easing.easeOut(1 - elapsedRatio);

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                snapToPixel: false,
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, ' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > duration) {
            ol.Observable.unByKey(listenerKey);
            return;
        }

        map.render();
    }
    listenerKey = map.on('postcompose', animate);
}

// DATA

var points = [
               {
                 "latitude": 8.4956318,
                 "longitude": 38.85989612,
                 "state": "critical"
               },
               {
                 "latitude": -11.2955362,
                 "longitude": 30.21094049,
                 "state": "critical"
               },
               {
                 "latitude": -21.42973562,
                 "longitude": -119.00910578,
                 "state": "critical"
               },
               {
                 "latitude": -34.93604663,
                 "longitude": -162.81950683,
                 "state": "critical"
               },
               {
                 "latitude": -21.2093064,
                 "longitude": -98.21489554,
                 "state": "critical"
               },
               {
                 "latitude": 8.8482476,
                 "longitude": 13.35267037,
                 "state": "critical"
               },
               {
                 "latitude": 1.41287082,
                 "longitude": 140.68967654,
                 "state": "critical"
               },
               {
                 "latitude": 30.12729767,
                 "longitude": 28.8488847,
                 "state": "critical"
               },
               {
                 "latitude": -74.8379154,
                 "longitude": -51.90803065,
                 "state": "critical"
               },
               {
                 "latitude": -9.76795969,
                 "longitude": -23.14783642,
                 "state": "critical"
               },
               {
                 "latitude": 46.47807924,
                 "longitude": -25.12566382,
                 "state": "critical"
               },
               {
                 "latitude": -42.17098897,
                 "longitude": 98.34996288,
                 "state": "critical"
               },
               {
                 "latitude": 48.88773338,
                 "longitude": -122.99984821,
                 "state": "critical"
               },
               {
                 "latitude": -36.20788692,
                 "longitude": -88.91001766,
                 "state": "critical"
               },
               {
                 "latitude": -12.00110474,
                 "longitude": 154.98397587,
                 "state": "critical"
               },
               {
                 "latitude": -75.28918822,
                 "longitude": 45.87723439,
                 "state": "critical"
               },
               {
                 "latitude": 45.3471675,
                 "longitude": 142.85917952,
                 "state": "critical"
               },
               {
                 "latitude": 70.78727712,
                 "longitude": -106.64689493,
                 "state": "critical"
               },
               {
                 "latitude": 9.76397672,
                 "longitude": -140.04942588,
                 "state": "critical"
               },
               {
                 "latitude": 3.91921419,
                 "longitude": -133.19981147,
                 "state": "critical"
               },
               {
                 "latitude": -70.71835521,
                 "longitude": 74.01324777,
                 "state": "critical"
               },
               {
                 "latitude": -15.12384849,
                 "longitude": 45.47130046,
                 "state": "critical"
               },
               {
                 "latitude": 15.47189431,
                 "longitude": 66.66336788,
                 "state": "critical"
               },
               {
                 "latitude": -32.57425599,
                 "longitude": -97.52395262,
                 "state": "critical"
               },
               {
                 "latitude": 25.78978781,
                 "longitude": 147.85053525,
                 "state": "critical"
               },
               {
                 "latitude": 0.00411938,
                 "longitude": -140.82792877,
                 "state": "critical"
               },
               {
                 "latitude": -56.32294933,
                 "longitude": -168.85747799,
                 "state": "critical"
               },
               {
                 "latitude": 60.90260042,
                 "longitude": 116.2813954,
                 "state": "critical"
               },
               {
                 "latitude": -33.91378584,
                 "longitude": -4.30601434,
                 "state": "critical"
               },
               {
                 "latitude": -53.7162938,
                 "longitude": 60.85679353,
                 "state": "critical"
               },
               {
                 "latitude": -50.73895384,
                 "longitude": 102.11347112,
                 "state": "critical"
               },
               {
                 "latitude": -14.0947761,
                 "longitude": -162.10590505,
                 "state": "critical"
               },
               {
                 "latitude": -43.74139178,
                 "longitude": -32.85874193,
                 "state": "critical"
               },
               {
                 "latitude": -7.24938271,
                 "longitude": -11.02162815,
                 "state": "critical"
               },
               {
                 "latitude": 51.48938805,
                 "longitude": -164.5684627,
                 "state": "critical"
               },
               {
                 "latitude": -22.85335747,
                 "longitude": 172.34953226,
                 "state": "critical"
               },
               {
                 "latitude": 54.3857248,
                 "longitude": 168.49833105,
                 "state": "critical"
               },
               {
                 "latitude": -20.6363944,
                 "longitude": -44.93157902,
                 "state": "critical"
               },
               {
                 "latitude": 13.18534775,
                 "longitude": 60.38828068,
                 "state": "critical"
               },
               {
                 "latitude": -41.01505432,
                 "longitude": 110.77276791,
                 "state": "critical"
               },
               {
                 "latitude": -37.08142261,
                 "longitude": 170.68549146,
                 "state": "critical"
               },
               {
                 "latitude": -5.72004042,
                 "longitude": -2.0626239,
                 "state": "critical"
               },
               {
                 "latitude": 23.97293664,
                 "longitude": 46.95516297,
                 "state": "critical"
               },
               {
                 "latitude": 77.66985838,
                 "longitude": -107.23154228,
                 "state": "critical"
               },
               {
                 "latitude": 6.86115048,
                 "longitude": -171.11379285,
                 "state": "critical"
               },
               {
                 "latitude": -14.15886525,
                 "longitude": 124.30591984,
                 "state": "critical"
               },
               {
                 "latitude": -76.32613885,
                 "longitude": 163.15377572,
                 "state": "critical"
               },
               {
                 "latitude": 15.62878353,
                 "longitude": -75.20374915,
                 "state": "critical"
               },
               {
                 "latitude": 59.65679292,
                 "longitude": 46.6391691,
                 "state": "critical"
               },
               {
                 "latitude": 31.95237532,
                 "longitude": 37.70475972,
                 "state": "critical"
               },
               {
                 "latitude": -12.31967685,
                 "longitude": 172.18267576,
                 "state": "critical"
               },
               {
                 "latitude": -13.0420051,
                 "longitude": -46.95271281,
                 "state": "critical"
               },
               {
                 "latitude": -69.70254865,
                 "longitude": -170.53028272,
                 "state": "critical"
               },
               {
                 "latitude": -39.48412652,
                 "longitude": -116.84417288,
                 "state": "critical"
               },
               {
                 "latitude": -57.28273791,
                 "longitude": 108.96098096,
                 "state": "critical"
               },
               {
                 "latitude": 14.96902993,
                 "longitude": 53.6469582,
                 "state": "critical"
               },
               {
                 "latitude": -20.30054765,
                 "longitude": -155.37001292,
                 "state": "critical"
               },
               {
                 "latitude": 4.03252724,
                 "longitude": 32.41057815,
                 "state": "critical"
               },
               {
                 "latitude": -29.83559362,
                 "longitude": 82.64229699,
                 "state": "critical"
               },
               {
                 "latitude": 55.0883785,
                 "longitude": -68.15866908,
                 "state": "critical"
               },
               {
                 "latitude": -4.87824748,
                 "longitude": -13.83084445,
                 "state": "critical"
               },
               {
                 "latitude": 27.54643955,
                 "longitude": 117.75937323,
                 "state": "critical"
               },
               {
                 "latitude": -42.56503966,
                 "longitude": -4.74926464,
                 "state": "critical"
               },
               {
                 "latitude": 18.87285615,
                 "longitude": -2.10490829,
                 "state": "critical"
               },
               {
                 "latitude": 3.82874834,
                 "longitude": 117.47598063,
                 "state": "critical"
               },
               {
                 "latitude": 5.12136665,
                 "longitude": 93.40920684,
                 "state": "critical"
               },
               {
                 "latitude": -1.60109642,
                 "longitude": -114.6654044,
                 "state": "critical"
               },
               {
                 "latitude": 49.81127887,
                 "longitude": 54.07568001,
                 "state": "critical"
               },
               {
                 "latitude": -84.3269722,
                 "longitude": 75.11895303,
                 "state": "critical"
               },
               {
                 "latitude": 46.84914869,
                 "longitude": -33.72527688,
                 "state": "critical"
               },
               {
                 "latitude": -11.27453009,
                 "longitude": -77.1217689,
                 "state": "critical"
               },
               {
                 "latitude": -67.82487226,
                 "longitude": 130.20713653,
                 "state": "critical"
               },
               {
                 "latitude": 56.43734718,
                 "longitude": -170.37481409,
                 "state": "critical"
               },
               {
                 "latitude": 15.72495949,
                 "longitude": 112.48353977,
                 "state": "critical"
               },
               {
                 "latitude": 75.10112074,
                 "longitude": 125.20711892,
                 "state": "critical"
               },
               {
                 "latitude": 39.39043414,
                 "longitude": 128.73592089,
                 "state": "critical"
               },
               {
                 "latitude": -21.46349841,
                 "longitude": -27.16512916,
                 "state": "critical"
               },
               {
                 "latitude": -68.06178172,
                 "longitude": 49.78227724,
                 "state": "critical"
               },
               {
                 "latitude": -44.49325854,
                 "longitude": -92.55818303,
                 "state": "critical"
               },
               {
                 "latitude": -4.46926153,
                 "longitude": -167.54896655,
                 "state": "critical"
               },
               {
                 "latitude": 25.182991,
                 "longitude": 32.42034579,
                 "state": "critical"
               },
               {
                 "latitude": -61.29437839,
                 "longitude": 131.46180678,
                 "state": "critical"
               },
               {
                 "latitude": -53.30454071,
                 "longitude": -147.98229123,
                 "state": "critical"
               },
               {
                 "latitude": -42.32481577,
                 "longitude": -104.80275461,
                 "state": "critical"
               },
               {
                 "latitude": -21.25301816,
                 "longitude": -58.17354178,
                 "state": "critical"
               },
               {
                 "latitude": -47.53893465,
                 "longitude": 7.61024379,
                 "state": "critical"
               },
               {
                 "latitude": -66.94472387,
                 "longitude": -100.34995022,
                 "state": "critical"
               },
               {
                 "latitude": -33.90348294,
                 "longitude": -123.18932491,
                 "state": "critical"
               },
               {
                 "latitude": -10.99519691,
                 "longitude": 112.73243506,
                 "state": "critical"
               },
               {
                 "latitude": -29.8007333,
                 "longitude": -81.52240927,
                 "state": "critical"
               },
               {
                 "latitude": 19.79133458,
                 "longitude": -100.91668468,
                 "state": "critical"
               },
               {
                 "latitude": 43.51845744,
                 "longitude": -99.67559754,
                 "state": "critical"
               },
               {
                 "latitude": -29.08823551,
                 "longitude": -133.36870196,
                 "state": "critical"
               },
               {
                 "latitude": 67.36122383,
                 "longitude": 109.23810349,
                 "state": "critical"
               },
               {
                 "latitude": 65.43540338,
                 "longitude": 139.41718957,
                 "state": "critical"
               },
               {
                 "latitude": -58.98410161,
                 "longitude": 159.94231,
                 "state": "critical"
               },
               {
                 "latitude": -68.84562848,
                 "longitude": -15.60258266,
                 "state": "critical"
               },
               {
                 "latitude": 59.17670936,
                 "longitude": -84.28401759,
                 "state": "critical"
               },
               {
                 "latitude": -14.82274348,
                 "longitude": 87.25136099,
                 "state": "critical"
               },
               {
                 "latitude": 55.29549247,
                 "longitude": -104.52819499,
                 "state": "critical"
               },
               {
                 "latitude": -68.78619049,
                 "longitude": 58.33250109,
                 "state": "critical"
               },
               {
                 "latitude": -79.50686536,
                 "longitude": 107.44145306,
                 "state": "critical"
               },
               {
                 "latitude": -62.89893179,
                 "longitude": -164.55034267,
                 "state": "critical"
               },
               {
                 "latitude": -86.96824682,
                 "longitude": 27.26285713,
                 "state": "critical"
               },
               {
                 "latitude": -51.54668681,
                 "longitude": -43.95487511,
                 "state": "critical"
               },
               {
                 "latitude": 52.91434879,
                 "longitude": -80.77125171,
                 "state": "critical"
               },
               {
                 "latitude": 63.0060653,
                 "longitude": -132.80638947,
                 "state": "critical"
               },
               {
                 "latitude": 40.21446286,
                 "longitude": -139.92454751,
                 "state": "critical"
               },
               {
                 "latitude": -55.13903598,
                 "longitude": -100.99403958,
                 "state": "critical"
               },
               {
                 "latitude": 63.42616478,
                 "longitude": 100.86598284,
                 "state": "critical"
               },
               {
                 "latitude": 20.49294199,
                 "longitude": 55.51665839,
                 "state": "critical"
               },
               {
                 "latitude": 57.53461931,
                 "longitude": 138.24196826,
                 "state": "critical"
               },
               {
                 "latitude": -40.64260854,
                 "longitude": 52.95650254,
                 "state": "critical"
               },
               {
                 "latitude": 57.05225703,
                 "longitude": -144.76303258,
                 "state": "critical"
               },
               {
                 "latitude": 26.15991462,
                 "longitude": 40.7028013,
                 "state": "critical"
               },
               {
                 "latitude": -63.98743357,
                 "longitude": 143.18581049,
                 "state": "critical"
               },
               {
                 "latitude": 23.63039769,
                 "longitude": -3.78197556,
                 "state": "critical"
               },
               {
                 "latitude": -25.52358071,
                 "longitude": -144.21384125,
                 "state": "critical"
               },
               {
                 "latitude": -61.0003858,
                 "longitude": 119.60555549,
                 "state": "critical"
               },
               {
                 "latitude": 5.12514042,
                 "longitude": 85.75535722,
                 "state": "critical"
               },
               {
                 "latitude": -24.45387714,
                 "longitude": -176.07015709,
                 "state": "critical"
               },
               {
                 "latitude": -62.17014984,
                 "longitude": 161.62276795,
                 "state": "critical"
               },
               {
                 "latitude": -26.91845679,
                 "longitude": 48.77806355,
                 "state": "critical"
               },
               {
                 "latitude": 43.28966115,
                 "longitude": -41.97232699,
                 "state": "critical"
               },
               {
                 "latitude": -75.63470424,
                 "longitude": 11.3193902,
                 "state": "critical"
               },
               {
                 "latitude": 44.57138045,
                 "longitude": 174.71770765,
                 "state": "critical"
               },
               {
                 "latitude": -41.2343993,
                 "longitude": 170.62914778,
                 "state": "critical"
               },
               {
                 "latitude": -31.16341552,
                 "longitude": -79.17196441,
                 "state": "critical"
               },
               {
                 "latitude": 27.04961288,
                 "longitude": -162.86123174,
                 "state": "critical"
               },
               {
                 "latitude": 27.98453803,
                 "longitude": 14.83062277,
                 "state": "critical"
               },
               {
                 "latitude": -38.20987122,
                 "longitude": -142.72818524,
                 "state": "critical"
               },
               {
                 "latitude": 2.94072188,
                 "longitude": 159.54076409,
                 "state": "critical"
               },
               {
                 "latitude": 22.56945649,
                 "longitude": 56.10738039,
                 "state": "critical"
               },
               {
                 "latitude": 32.93050011,
                 "longitude": -162.63007772,
                 "state": "critical"
               },
               {
                 "latitude": -78.27867643,
                 "longitude": -59.14031924,
                 "state": "critical"
               },
               {
                 "latitude": -43.0591858,
                 "longitude": -116.94195033,
                 "state": "critical"
               },
               {
                 "latitude": 22.14877791,
                 "longitude": 155.45907472,
                 "state": "critical"
               },
               {
                 "latitude": -2.09932305,
                 "longitude": -45.67924854,
                 "state": "critical"
               },
               {
                 "latitude": 12.95117853,
                 "longitude": -51.89476109,
                 "state": "critical"
               },
               {
                 "latitude": -21.07824782,
                 "longitude": -75.05352588,
                 "state": "critical"
               },
               {
                 "latitude": -19.95705473,
                 "longitude": -149.55223228,
                 "state": "critical"
               },
               {
                 "latitude": 49.60597408,
                 "longitude": -134.11013362,
                 "state": "critical"
               },
               {
                 "latitude": -35.60986642,
                 "longitude": 166.51968687,
                 "state": "critical"
               },
               {
                 "latitude": 46.44660665,
                 "longitude": -59.14104066,
                 "state": "critical"
               },
               {
                 "latitude": -0.57165333,
                 "longitude": -125.64315041,
                 "state": "critical"
               },
               {
                 "latitude": 15.95620833,
                 "longitude": 130.85556623,
                 "state": "critical"
               },
               {
                 "latitude": -28.37132687,
                 "longitude": -146.41389352,
                 "state": "critical"
               },
               {
                 "latitude": 27.78387698,
                 "longitude": -48.7704824,
                 "state": "critical"
               },
               {
                 "latitude": 45.75926523,
                 "longitude": 48.35423453,
                 "state": "critical"
               },
               {
                 "latitude": -3.69657312,
                 "longitude": -4.18518266,
                 "state": "critical"
               },
               {
                 "latitude": -4.74022337,
                 "longitude": 51.53637782,
                 "state": "critical"
               },
               {
                 "latitude": 22.79834054,
                 "longitude": -22.54562271,
                 "state": "critical"
               },
               {
                 "latitude": 21.4066974,
                 "longitude": -105.92275789,
                 "state": "critical"
               },
               {
                 "latitude": 7.28248659,
                 "longitude": -172.89170612,
                 "state": "critical"
               },
               {
                 "latitude": 23.59382701,
                 "longitude": -37.53943974,
                 "state": "critical"
               },
               {
                 "latitude": -57.26876728,
                 "longitude": -115.41174311,
                 "state": "critical"
               },
               {
                 "latitude": -43.1874116,
                 "longitude": -113.71374835,
                 "state": "critical"
               },
               {
                 "latitude": 15.26792141,
                 "longitude": -91.16194153,
                 "state": "critical"
               },
               {
                 "latitude": 21.36571688,
                 "longitude": -119.66333089,
                 "state": "critical"
               },
               {
                 "latitude": -72.1600506,
                 "longitude": 167.46874894,
                 "state": "critical"
               },
               {
                 "latitude": 26.8595495,
                 "longitude": -90.06283154,
                 "state": "critical"
               },
               {
                 "latitude": -48.06165759,
                 "longitude": 91.54560545,
                 "state": "critical"
               },
               {
                 "latitude": -49.4884681,
                 "longitude": -160.64622801,
                 "state": "critical"
               },
               {
                 "latitude": 6.9325863,
                 "longitude": -118.94131165,
                 "state": "critical"
               },
               {
                 "latitude": -56.36106012,
                 "longitude": -135.86349744,
                 "state": "critical"
               },
               {
                 "latitude": -51.921067,
                 "longitude": -128.40172234,
                 "state": "critical"
               },
               {
                 "latitude": 60.7761021,
                 "longitude": -47.05321661,
                 "state": "critical"
               },
               {
                 "latitude": -66.3753609,
                 "longitude": -71.55253921,
                 "state": "critical"
               },
               {
                 "latitude": 11.97973143,
                 "longitude": 49.57932916,
                 "state": "critical"
               },
               {
                 "latitude": -29.25707914,
                 "longitude": 175.27567154,
                 "state": "critical"
               },
               {
                 "latitude": 19.20507332,
                 "longitude": 158.58528839,
                 "state": "critical"
               },
               {
                 "latitude": -52.39968252,
                 "longitude": 112.72472759,
                 "state": "critical"
               },
               {
                 "latitude": 15.55974998,
                 "longitude": 34.32360309,
                 "state": "critical"
               },
               {
                 "latitude": 24.60029383,
                 "longitude": -117.75243452,
                 "state": "critical"
               },
               {
                 "latitude": -31.00652297,
                 "longitude": 41.85100407,
                 "state": "critical"
               },
               {
                 "latitude": 23.72798123,
                 "longitude": -91.95441749,
                 "state": "critical"
               },
               {
                 "latitude": -63.1183458,
                 "longitude": -80.5301264,
                 "state": "critical"
               },
               {
                 "latitude": 7.73810446,
                 "longitude": -105.34401181,
                 "state": "critical"
               },
               {
                 "latitude": -26.17701955,
                 "longitude": -154.08220617,
                 "state": "critical"
               },
               {
                 "latitude": -68.06839388,
                 "longitude": -131.13561816,
                 "state": "critical"
               },
               {
                 "latitude": 18.49807108,
                 "longitude": 62.15135139,
                 "state": "critical"
               },
               {
                 "latitude": -21.57647634,
                 "longitude": 29.09222437,
                 "state": "critical"
               },
               {
                 "latitude": 9.44350454,
                 "longitude": 147.85206593,
                 "state": "critical"
               },
               {
                 "latitude": -5.14399006,
                 "longitude": -176.16601193,
                 "state": "critical"
               },
               {
                 "latitude": 20.15330495,
                 "longitude": -146.18966425,
                 "state": "critical"
               },
               {
                 "latitude": -15.07485913,
                 "longitude": -105.12648118,
                 "state": "critical"
               },
               {
                 "latitude": 4.72921989,
                 "longitude": -164.14419054,
                 "state": "critical"
               },
               {
                 "latitude": 56.01703164,
                 "longitude": 105.51330006,
                 "state": "critical"
               },
               {
                 "latitude": 31.97154837,
                 "longitude": 52.03403785,
                 "state": "critical"
               },
               {
                 "latitude": 21.03346213,
                 "longitude": -43.68018134,
                 "state": "critical"
               },
               {
                 "latitude": 49.26078841,
                 "longitude": 4.81797589,
                 "state": "critical"
               },
               {
                 "latitude": 77.75068149,
                 "longitude": 83.83489215,
                 "state": "critical"
               },
               {
                 "latitude": 27.48179123,
                 "longitude": 168.31476658,
                 "state": "critical"
               },
               {
                 "latitude": 39.23105859,
                 "longitude": -117.24994081,
                 "state": "critical"
               },
               {
                 "latitude": 16.77656291,
                 "longitude": -163.30339832,
                 "state": "critical"
               },
               {
                 "latitude": 59.28853285,
                 "longitude": 143.02941744,
                 "state": "critical"
               },
               {
                 "latitude": -27.70338107,
                 "longitude": -160.20617575,
                 "state": "critical"
               },
               {
                 "latitude": 35.50299217,
                 "longitude": -5.59642212,
                 "state": "critical"
               },
               {
                 "latitude": -34.17905941,
                 "longitude": -44.08664165,
                 "state": "critical"
               },
               {
                 "latitude": -4.93172636,
                 "longitude": -25.09521021,
                 "state": "critical"
               },
               {
                 "latitude": 51.86656212,
                 "longitude": -1.55078662,
                 "state": "critical"
               },
               {
                 "latitude": 49.1537762,
                 "longitude": -49.75367333,
                 "state": "critical"
               },
               {
                 "latitude": -40.95824101,
                 "longitude": -52.551284,
                 "state": "critical"
               },
               {
                 "latitude": -11.9632129,
                 "longitude": 139.44748151,
                 "state": "major"
               },
               {
                 "latitude": 35.11619583,
                 "longitude": -136.8364974,
                 "state": "major"
               },
               {
                 "latitude": 67.81120799,
                 "longitude": 153.89552022,
                 "state": "major"
               },
               {
                 "latitude": -16.6356445,
                 "longitude": -133.7795808,
                 "state": "major"
               },
               {
                 "latitude": -22.88978992,
                 "longitude": 6.36518127,
                 "state": "major"
               },
               {
                 "latitude": -42.38238726,
                 "longitude": 13.58314769,
                 "state": "major"
               },
               {
                 "latitude": 21.9533655,
                 "longitude": -154.99049803,
                 "state": "major"
               },
               {
                 "latitude": -71.9205689,
                 "longitude": 94.36442255,
                 "state": "major"
               },
               {
                 "latitude": -5.16496287,
                 "longitude": 94.88541713,
                 "state": "major"
               },
               {
                 "latitude": -38.93865071,
                 "longitude": -18.63644579,
                 "state": "major"
               },
               {
                 "latitude": -14.83212866,
                 "longitude": -173.77203412,
                 "state": "major"
               },
               {
                 "latitude": 33.28224135,
                 "longitude": 60.25415742,
                 "state": "major"
               },
               {
                 "latitude": -81.01398577,
                 "longitude": 67.46070666,
                 "state": "major"
               },
               {
                 "latitude": 9.30551329,
                 "longitude": -10.6978498,
                 "state": "major"
               },
               {
                 "latitude": 0.3447891,
                 "longitude": 73.93344429,
                 "state": "major"
               },
               {
                 "latitude": 34.95170601,
                 "longitude": 119.74614116,
                 "state": "major"
               },
               {
                 "latitude": -10.10546069,
                 "longitude": 5.51211844,
                 "state": "major"
               },
               {
                 "latitude": 34.55855804,
                 "longitude": 83.01208058,
                 "state": "major"
               },
               {
                 "latitude": 31.62731393,
                 "longitude": -161.49672078,
                 "state": "major"
               },
               {
                 "latitude": 35.3898961,
                 "longitude": 103.33120421,
                 "state": "major"
               },
               {
                 "latitude": 28.01884254,
                 "longitude": -59.59658242,
                 "state": "major"
               },
               {
                 "latitude": -10.05947502,
                 "longitude": 22.65380185,
                 "state": "major"
               },
               {
                 "latitude": -71.51935367,
                 "longitude": -160.46782623,
                 "state": "major"
               },
               {
                 "latitude": 55.43469619,
                 "longitude": -141.99157115,
                 "state": "major"
               },
               {
                 "latitude": 22.43155934,
                 "longitude": -82.49713346,
                 "state": "major"
               },
               {
                 "latitude": 64.29257421,
                 "longitude": 146.49312963,
                 "state": "major"
               },
               {
                 "latitude": -54.74088856,
                 "longitude": 13.0720986,
                 "state": "major"
               },
               {
                 "latitude": 4.47158474,
                 "longitude": -46.96642782,
                 "state": "major"
               },
               {
                 "latitude": -39.51753678,
                 "longitude": 169.73542814,
                 "state": "major"
               },
               {
                 "latitude": -4.68300474,
                 "longitude": -176.71274924,
                 "state": "major"
               },
               {
                 "latitude": -36.53938656,
                 "longitude": -34.16010836,
                 "state": "major"
               },
               {
                 "latitude": -82.74404147,
                 "longitude": 103.98649537,
                 "state": "major"
               },
               {
                 "latitude": -22.82003497,
                 "longitude": 18.98393062,
                 "state": "major"
               },
               {
                 "latitude": -69.15117508,
                 "longitude": 131.55138156,
                 "state": "major"
               },
               {
                 "latitude": -9.45580618,
                 "longitude": -104.8667083,
                 "state": "major"
               },
               {
                 "latitude": -62.39423334,
                 "longitude": -43.41090832,
                 "state": "major"
               },
               {
                 "latitude": 7.90431506,
                 "longitude": 64.05174318,
                 "state": "major"
               },
               {
                 "latitude": 52.32205332,
                 "longitude": -7.51447295,
                 "state": "major"
               },
               {
                 "latitude": -32.63149708,
                 "longitude": -21.17349567,
                 "state": "major"
               },
               {
                 "latitude": 73.04725281,
                 "longitude": 152.7303994,
                 "state": "major"
               },
               {
                 "latitude": 10.21319435,
                 "longitude": 162.10925113,
                 "state": "major"
               },
               {
                 "latitude": 33.20188186,
                 "longitude": -171.5319188,
                 "state": "major"
               },
               {
                 "latitude": -14.15000791,
                 "longitude": 65.02615303,
                 "state": "major"
               },
               {
                 "latitude": 40.08220693,
                 "longitude": -107.23596984,
                 "state": "major"
               },
               {
                 "latitude": -45.64098819,
                 "longitude": 146.47875913,
                 "state": "major"
               },
               {
                 "latitude": 51.39339355,
                 "longitude": 97.95008127,
                 "state": "major"
               },
               {
                 "latitude": -20.91982977,
                 "longitude": 117.77435906,
                 "state": "major"
               },
               {
                 "latitude": 7.38212597,
                 "longitude": -7.05444304,
                 "state": "major"
               },
               {
                 "latitude": 71.83059583,
                 "longitude": 166.72818476,
                 "state": "major"
               },
               {
                 "latitude": -33.7608539,
                 "longitude": -2.41349361,
                 "state": "major"
               },
               {
                 "latitude": 16.68869074,
                 "longitude": 78.42068684,
                 "state": "major"
               },
               {
                 "latitude": -36.2245091,
                 "longitude": 104.46172782,
                 "state": "major"
               },
               {
                 "latitude": 40.00616368,
                 "longitude": 29.33395253,
                 "state": "major"
               },
               {
                 "latitude": 2.06181709,
                 "longitude": 170.47589666,
                 "state": "major"
               },
               {
                 "latitude": -9.43332273,
                 "longitude": -40.01274015,
                 "state": "major"
               },
               {
                 "latitude": -44.86873516,
                 "longitude": 102.53595265,
                 "state": "major"
               },
               {
                 "latitude": 54.68766232,
                 "longitude": -74.5328372,
                 "state": "major"
               },
               {
                 "latitude": -72.01241615,
                 "longitude": 159.063554,
                 "state": "major"
               },
               {
                 "latitude": 14.47571073,
                 "longitude": -165.87846009,
                 "state": "major"
               },
               {
                 "latitude": -8.34335021,
                 "longitude": 99.23280828,
                 "state": "major"
               },
               {
                 "latitude": -21.2250547,
                 "longitude": -144.78920448,
                 "state": "major"
               },
               {
                 "latitude": 60.12328601,
                 "longitude": 28.86672315,
                 "state": "major"
               },
               {
                 "latitude": -55.83032991,
                 "longitude": -138.88685654,
                 "state": "major"
               },
               {
                 "latitude": -12.18963874,
                 "longitude": -178.09772099,
                 "state": "major"
               },
               {
                 "latitude": 15.27799299,
                 "longitude": -61.95854851,
                 "state": "major"
               },
               {
                 "latitude": -37.03973153,
                 "longitude": -174.1378353,
                 "state": "major"
               },
               {
                 "latitude": -52.51313331,
                 "longitude": 44.08517343,
                 "state": "major"
               },
               {
                 "latitude": -38.43266369,
                 "longitude": 50.82742842,
                 "state": "major"
               },
               {
                 "latitude": -7.44236294,
                 "longitude": 86.08265239,
                 "state": "major"
               },
               {
                 "latitude": -49.79724524,
                 "longitude": 15.33137965,
                 "state": "major"
               },
               {
                 "latitude": -57.28885443,
                 "longitude": 132.94453071,
                 "state": "major"
               },
               {
                 "latitude": -23.17200281,
                 "longitude": 84.02258671,
                 "state": "major"
               },
               {
                 "latitude": 26.89156032,
                 "longitude": -146.91237906,
                 "state": "major"
               },
               {
                 "latitude": 51.51463589,
                 "longitude": -100.27492296,
                 "state": "major"
               },
               {
                 "latitude": 3.25979341,
                 "longitude": 171.73533405,
                 "state": "major"
               },
               {
                 "latitude": -16.83214591,
                 "longitude": -1.43324378,
                 "state": "major"
               },
               {
                 "latitude": 56.84722817,
                 "longitude": 27.08779438,
                 "state": "major"
               },
               {
                 "latitude": 19.54059282,
                 "longitude": -161.04997675,
                 "state": "major"
               },
               {
                 "latitude": -48.93271117,
                 "longitude": 64.60301289,
                 "state": "major"
               },
               {
                 "latitude": 36.87136464,
                 "longitude": -79.36236502,
                 "state": "major"
               },
               {
                 "latitude": -42.99504503,
                 "longitude": -147.26227623,
                 "state": "major"
               },
               {
                 "latitude": -56.66207425,
                 "longitude": 142.42992206,
                 "state": "major"
               },
               {
                 "latitude": 52.05797061,
                 "longitude": -77.86005312,
                 "state": "major"
               },
               {
                 "latitude": -15.08954555,
                 "longitude": 5.11974057,
                 "state": "major"
               },
               {
                 "latitude": -15.69081772,
                 "longitude": -46.55675317,
                 "state": "major"
               },
               {
                 "latitude": -46.76956538,
                 "longitude": -103.6313875,
                 "state": "major"
               },
               {
                 "latitude": -59.59759866,
                 "longitude": -124.89468364,
                 "state": "major"
               },
               {
                 "latitude": -12.63023078,
                 "longitude": 19.43632275,
                 "state": "major"
               },
               {
                 "latitude": 82.72185997,
                 "longitude": 10.73512982,
                 "state": "major"
               },
               {
                 "latitude": 16.49702552,
                 "longitude": 65.73260656,
                 "state": "major"
               },
               {
                 "latitude": 25.36800792,
                 "longitude": 160.62544606,
                 "state": "major"
               },
               {
                 "latitude": 0.39758169,
                 "longitude": -66.79833879,
                 "state": "major"
               },
               {
                 "latitude": -18.55598676,
                 "longitude": -103.32456313,
                 "state": "major"
               },
               {
                 "latitude": -36.4292054,
                 "longitude": 87.32533818,
                 "state": "major"
               },
               {
                 "latitude": 32.43933113,
                 "longitude": 34.43553179,
                 "state": "major"
               },
               {
                 "latitude": 35.66786095,
                 "longitude": -142.64151761,
                 "state": "major"
               },
               {
                 "latitude": -28.8536598,
                 "longitude": 26.97132818,
                 "state": "major"
               },
               {
                 "latitude": -32.86648457,
                 "longitude": -124.15484711,
                 "state": "major"
               },
               {
                 "latitude": 40.4646574,
                 "longitude": -43.30922674,
                 "state": "major"
               },
               {
                 "latitude": -70.41444716,
                 "longitude": 148.17716134,
                 "state": "major"
               },
               {
                 "latitude": 17.21154708,
                 "longitude": -143.70904179,
                 "state": "major"
               },
               {
                 "latitude": -31.29592208,
                 "longitude": 47.13375599,
                 "state": "major"
               },
               {
                 "latitude": -15.49973954,
                 "longitude": 57.88632495,
                 "state": "major"
               },
               {
                 "latitude": 32.77237307,
                 "longitude": -74.10435849,
                 "state": "major"
               },
               {
                 "latitude": -40.55067341,
                 "longitude": 104.3289868,
                 "state": "major"
               },
               {
                 "latitude": -14.1678313,
                 "longitude": -73.73654914,
                 "state": "major"
               },
               {
                 "latitude": -19.6912476,
                 "longitude": 110.33787484,
                 "state": "major"
               },
               {
                 "latitude": -50.84797009,
                 "longitude": 105.11196533,
                 "state": "major"
               },
               {
                 "latitude": -13.7838571,
                 "longitude": -39.83798692,
                 "state": "major"
               },
               {
                 "latitude": -51.86627107,
                 "longitude": 65.57994483,
                 "state": "major"
               },
               {
                 "latitude": 57.10504764,
                 "longitude": -146.61550697,
                 "state": "major"
               },
               {
                 "latitude": -86.79180876,
                 "longitude": 156.15484786,
                 "state": "major"
               },
               {
                 "latitude": -25.83630578,
                 "longitude": -161.21196263,
                 "state": "major"
               },
               {
                 "latitude": -15.94798473,
                 "longitude": 0.45343396,
                 "state": "major"
               },
               {
                 "latitude": 50.36146581,
                 "longitude": -148.76946373,
                 "state": "major"
               },
               {
                 "latitude": 50.23023283,
                 "longitude": -84.02588555,
                 "state": "major"
               },
               {
                 "latitude": 33.80988754,
                 "longitude": 9.90678226,
                 "state": "major"
               },
               {
                 "latitude": -9.79581882,
                 "longitude": 141.73769799,
                 "state": "major"
               },
               {
                 "latitude": 32.37165555,
                 "longitude": -94.15576524,
                 "state": "major"
               },
               {
                 "latitude": -17.73458273,
                 "longitude": -178.177151,
                 "state": "minor"
               },
               {
                 "latitude": 74.91715752,
                 "longitude": -28.20638583,
                 "state": "minor"
               },
               {
                 "latitude": -65.35379695,
                 "longitude": 94.08200995,
                 "state": "minor"
               },
               {
                 "latitude": 34.31740685,
                 "longitude": -7.26750953,
                 "state": "minor"
               },
               {
                 "latitude": 7.04174042,
                 "longitude": 110.67188637,
                 "state": "minor"
               },
               {
                 "latitude": 24.96761553,
                 "longitude": 151.07546081,
                 "state": "minor"
               },
               {
                 "latitude": -2.50189869,
                 "longitude": -151.23044755,
                 "state": "minor"
               },
               {
                 "latitude": -8.04160162,
                 "longitude": -117.50868201,
                 "state": "minor"
               },
               {
                 "latitude": 53.31831523,
                 "longitude": -128.26324086,
                 "state": "minor"
               },
               {
                 "latitude": -8.41811887,
                 "longitude": -133.98270942,
                 "state": "minor"
               },
               {
                 "latitude": -40.08755782,
                 "longitude": 47.47299582,
                 "state": "minor"
               },
               {
                 "latitude": -41.67064678,
                 "longitude": -101.30462435,
                 "state": "minor"
               },
               {
                 "latitude": -38.51980836,
                 "longitude": -89.17044659,
                 "state": "minor"
               },
               {
                 "latitude": 22.98594675,
                 "longitude": -85.13197469,
                 "state": "minor"
               },
               {
                 "latitude": 51.58168008,
                 "longitude": 13.85537911,
                 "state": "minor"
               },
               {
                 "latitude": -7.68587386,
                 "longitude": -144.35246643,
                 "state": "minor"
               },
               {
                 "latitude": -42.66851913,
                 "longitude": 71.7939675,
                 "state": "minor"
               },
               {
                 "latitude": -3.26643226,
                 "longitude": 114.97575779,
                 "state": "minor"
               },
               {
                 "latitude": -18.14856352,
                 "longitude": 24.33024619,
                 "state": "minor"
               },
               {
                 "latitude": 65.86335312,
                 "longitude": -66.29875093,
                 "state": "minor"
               },
               {
                 "latitude": 27.01382508,
                 "longitude": -16.70580587,
                 "state": "minor"
               },
               {
                 "latitude": 49.43594517,
                 "longitude": 56.346281,
                 "state": "minor"
               },
               {
                 "latitude": 51.62987983,
                 "longitude": 2.74820829,
                 "state": "minor"
               },
               {
                 "latitude": 40.39902564,
                 "longitude": -88.40584559,
                 "state": "minor"
               },
               {
                 "latitude": -10.33371267,
                 "longitude": -123.28642713,
                 "state": "minor"
               },
               {
                 "latitude": 25.40530865,
                 "longitude": -45.55534415,
                 "state": "minor"
               },
               {
                 "latitude": -40.55723123,
                 "longitude": -53.50745678,
                 "state": "minor"
               },
               {
                 "latitude": 42.9367469,
                 "longitude": -61.39210566,
                 "state": "minor"
               },
               {
                 "latitude": 35.32549095,
                 "longitude": -59.78796676,
                 "state": "minor"
               },
               {
                 "latitude": 63.39556782,
                 "longitude": -2.36110212,
                 "state": "minor"
               },
               {
                 "latitude": -23.19765041,
                 "longitude": -118.46728459,
                 "state": "minor"
               },
               {
                 "latitude": -38.21849252,
                 "longitude": -135.61333247,
                 "state": "minor"
               },
               {
                 "latitude": -35.00160011,
                 "longitude": -125.447422,
                 "state": "minor"
               },
               {
                 "latitude": 45.9842789,
                 "longitude": 72.70458364,
                 "state": "minor"
               },
               {
                 "latitude": 14.62775485,
                 "longitude": -130.18550143,
                 "state": "minor"
               },
               {
                 "latitude": -51.67882312,
                 "longitude": -113.60856198,
                 "state": "minor"
               },
               {
                 "latitude": -43.62474492,
                 "longitude": -133.75009032,
                 "state": "minor"
               },
               {
                 "latitude": 11.79987206,
                 "longitude": 41.24134048,
                 "state": "minor"
               },
               {
                 "latitude": 51.15718802,
                 "longitude": 4.92844054,
                 "state": "minor"
               },
               {
                 "latitude": 11.94050916,
                 "longitude": 37.70119402,
                 "state": "minor"
               },
               {
                 "latitude": 57.87333958,
                 "longitude": 10.98660624,
                 "state": "minor"
               },
               {
                 "latitude": -34.74299895,
                 "longitude": -41.78870692,
                 "state": "minor"
               },
               {
                 "latitude": -58.5709025,
                 "longitude": -5.70142951,
                 "state": "minor"
               },
               {
                 "latitude": 8.53307464,
                 "longitude": 111.02020199,
                 "state": "minor"
               },
               {
                 "latitude": 74.94504166,
                 "longitude": -146.21572273,
                 "state": "minor"
               },
               {
                 "latitude": -28.05504466,
                 "longitude": -31.6006809,
                 "state": "minor"
               },
               {
                 "latitude": -46.25444146,
                 "longitude": -64.49033729,
                 "state": "minor"
               },
               {
                 "latitude": -7.91592468,
                 "longitude": 72.22090896,
                 "state": "minor"
               },
               {
                 "latitude": 59.35198223,
                 "longitude": 9.21365828,
                 "state": "minor"
               },
               {
                 "latitude": 53.82296582,
                 "longitude": 2.05055107,
                 "state": "minor"
               },
               {
                 "latitude": 20.51106442,
                 "longitude": 0.46065674,
                 "state": "minor"
               },
               {
                 "latitude": 47.55337419,
                 "longitude": 45.54912264,
                 "state": "minor"
               },
               {
                 "latitude": 27.37574919,
                 "longitude": -67.14313461,
                 "state": "minor"
               },
               {
                 "latitude": -23.14261127,
                 "longitude": 30.55308191,
                 "state": "minor"
               },
               {
                 "latitude": 10.74683591,
                 "longitude": -1.37676208,
                 "state": "minor"
               },
               {
                 "latitude": 11.5765294,
                 "longitude": 20.05494938,
                 "state": "minor"
               },
               {
                 "latitude": -12.48861134,
                 "longitude": -169.03670944,
                 "state": "minor"
               },
               {
                 "latitude": -51.8578696,
                 "longitude": -16.53427908,
                 "state": "minor"
               },
               {
                 "latitude": -56.82487936,
                 "longitude": 76.6247293,
                 "state": "minor"
               },
               {
                 "latitude": -1.14402122,
                 "longitude": 136.37287148,
                 "state": "minor"
               },
               {
                 "latitude": -18.17989373,
                 "longitude": -17.83473981,
                 "state": "minor"
               },
               {
                 "latitude": -49.7628678,
                 "longitude": -12.69333584,
                 "state": "minor"
               },
               {
                 "latitude": 23.83853392,
                 "longitude": -174.97910724,
                 "state": "minor"
               },
               {
                 "latitude": 12.34651261,
                 "longitude": -147.48557685,
                 "state": "minor"
               },
               {
                 "latitude": -24.64383707,
                 "longitude": 86.61874138,
                 "state": "minor"
               },
               {
                 "latitude": -7.2729902,
                 "longitude": 171.57980799,
                 "state": "minor"
               },
               {
                 "latitude": -35.27709492,
                 "longitude": 101.29297828,
                 "state": "minor"
               },
               {
                 "latitude": 60.73701829,
                 "longitude": -116.98838186,
                 "state": "minor"
               },
               {
                 "latitude": 28.47982513,
                 "longitude": 70.49566442,
                 "state": "minor"
               },
               {
                 "latitude": -40.78902308,
                 "longitude": 175.31057153,
                 "state": "minor"
               },
               {
                 "latitude": -36.14098074,
                 "longitude": 22.75841618,
                 "state": "minor"
               },
               {
                 "latitude": 42.16209457,
                 "longitude": -28.39684016,
                 "state": "minor"
               },
               {
                 "latitude": 38.33012067,
                 "longitude": 123.74178497,
                 "state": "minor"
               },
               {
                 "latitude": -41.96700874,
                 "longitude": 7.89859497,
                 "state": "minor"
               },
               {
                 "latitude": 10.31224514,
                 "longitude": -98.87240246,
                 "state": "minor"
               },
               {
                 "latitude": -46.50442681,
                 "longitude": -11.44063874,
                 "state": "minor"
               },
               {
                 "latitude": 12.23927323,
                 "longitude": -46.80154279,
                 "state": "minor"
               },
               {
                 "latitude": -42.63532691,
                 "longitude": -122.97892611,
                 "state": "minor"
               },
               {
                 "latitude": 11.7021807,
                 "longitude": -28.74343926,
                 "state": "minor"
               },
               {
                 "latitude": -16.53314775,
                 "longitude": -28.17408462,
                 "state": "minor"
               },
               {
                 "latitude": -71.12566296,
                 "longitude": 168.09147042,
                 "state": "minor"
               },
               {
                 "latitude": 9.52549009,
                 "longitude": 155.46366497,
                 "state": "minor"
               },
               {
                 "latitude": -29.10661385,
                 "longitude": -164.01318802,
                 "state": "minor"
               },
               {
                 "latitude": 8.11856601,
                 "longitude": 7.47064581,
                 "state": "minor"
               },
               {
                 "latitude": -74.81814433,
                 "longitude": -18.7741668,
                 "state": "minor"
               },
               {
                 "latitude": 53.86108461,
                 "longitude": -28.31372953,
                 "state": "minor"
               },
               {
                 "latitude": -49.25977881,
                 "longitude": -134.64537721,
                 "state": "minor"
               },
               {
                 "latitude": -64.31033336,
                 "longitude": 118.71063452,
                 "state": "minor"
               },
               {
                 "latitude": -70.52595398,
                 "longitude": -108.42896838,
                 "state": "minor"
               },
               {
                 "latitude": 19.06371211,
                 "longitude": -51.41294204,
                 "state": "minor"
               },
               {
                 "latitude": -51.57627572,
                 "longitude": -150.66755172,
                 "state": "minor"
               },
               {
                 "latitude": 47.0129331,
                 "longitude": -78.19052689,
                 "state": "minor"
               },
               {
                 "latitude": 13.56200499,
                 "longitude": 78.05032568,
                 "state": "minor"
               },
               {
                 "latitude": -10.7413788,
                 "longitude": 6.68571996,
                 "state": "minor"
               },
               {
                 "latitude": 0.76309385,
                 "longitude": -119.38596639,
                 "state": "minor"
               },
               {
                 "latitude": 3.92028199,
                 "longitude": 53.00621,
                 "state": "minor"
               },
               {
                 "latitude": 43.05410229,
                 "longitude": 112.43922892,
                 "state": "minor"
               },
               {
                 "latitude": -23.32501005,
                 "longitude": 23.04941176,
                 "state": "minor"
               },
               {
                 "latitude": 15.31707958,
                 "longitude": -67.99864626,
                 "state": "minor"
               },
               {
                 "latitude": -24.48439434,
                 "longitude": -62.92498282,
                 "state": "minor"
               },
               {
                 "latitude": 63.50331857,
                 "longitude": -134.81951005,
                 "state": "minor"
               },
               {
                 "latitude": -81.68606182,
                 "longitude": 161.9610634,
                 "state": "minor"
               },
               {
                 "latitude": 56.76859588,
                 "longitude": -92.08421917,
                 "state": "minor"
               },
               {
                 "latitude": 66.3579566,
                 "longitude": 103.07284092,
                 "state": "minor"
               },
               {
                 "latitude": -75.08557636,
                 "longitude": 31.57837048,
                 "state": "minor"
               },
               {
                 "latitude": -27.15048428,
                 "longitude": -75.12425331,
                 "state": "minor"
               },
               {
                 "latitude": 31.68242351,
                 "longitude": 164.15542818,
                 "state": "minor"
               },
               {
                 "latitude": 22.51203273,
                 "longitude": 152.40214403,
                 "state": "minor"
               },
               {
                 "latitude": 35.38996914,
                 "longitude": 26.13380893,
                 "state": "minor"
               },
               {
                 "latitude": 32.76849073,
                 "longitude": 88.29356382,
                 "state": "minor"
               },
               {
                 "latitude": 59.93416608,
                 "longitude": 9.4634334,
                 "state": "minor"
               },
               {
                 "latitude": -55.67482173,
                 "longitude": -159.75833548,
                 "state": "minor"
               },
               {
                 "latitude": 60.19896275,
                 "longitude": -84.02376688,
                 "state": "minor"
               },
               {
                 "latitude": -5.16430125,
                 "longitude": 126.94469704,
                 "state": "minor"
               },
               {
                 "latitude": 1.64935268,
                 "longitude": 175.15951283,
                 "state": "minor"
               },
               {
                 "latitude": -49.50296308,
                 "longitude": -143.38783715,
                 "state": "minor"
               },
               {
                 "latitude": -8.09228518,
                 "longitude": -88.7273844,
                 "state": "minor"
               },
               {
                 "latitude": 16.60682386,
                 "longitude": -55.13154905,
                 "state": "minor"
               },
               {
                 "latitude": -33.80523068,
                 "longitude": -23.73144032,
                 "state": "minor"
               },
               {
                 "latitude": -76.49171277,
                 "longitude": -68.6143825,
                 "state": "minor"
               },
               {
                 "latitude": -33.66960327,
                 "longitude": -143.26642146,
                 "state": "minor"
               },
               {
                 "latitude": 3.81865136,
                 "longitude": -132.0585919,
                 "state": "minor"
               },
               {
                 "latitude": -28.95711264,
                 "longitude": 20.73539286,
                 "state": "minor"
               },
               {
                 "latitude": 41.21746078,
                 "longitude": -89.70521601,
                 "state": "minor"
               },
               {
                 "latitude": -60.4798892,
                 "longitude": 30.82034505,
                 "state": "minor"
               },
               {
                 "latitude": -55.66642768,
                 "longitude": 159.85780356,
                 "state": "minor"
               },
               {
                 "latitude": 29.40073323,
                 "longitude": 161.06496611,
                 "state": "minor"
               },
               {
                 "latitude": 40.95918922,
                 "longitude": -151.15531409,
                 "state": "minor"
               },
               {
                 "latitude": 8.30179365,
                 "longitude": 48.83879054,
                 "state": "minor"
               },
               {
                 "latitude": -25.61016314,
                 "longitude": 18.58826357,
                 "state": "minor"
               },
               {
                 "latitude": -67.17996206,
                 "longitude": -63.12706244,
                 "state": "minor"
               },
               {
                 "latitude": -18.10155859,
                 "longitude": 108.49955732,
                 "state": "minor"
               },
               {
                 "latitude": -65.84710487,
                 "longitude": 65.63555285,
                 "state": "minor"
               },
               {
                 "latitude": 36.20093825,
                 "longitude": -79.10735005,
                 "state": "minor"
               },
               {
                 "latitude": 36.34388335,
                 "longitude": -91.4351229,
                 "state": "minor"
               },
               {
                 "latitude": -15.65849181,
                 "longitude": 29.94828313,
                 "state": "minor"
               },
               {
                 "latitude": 42.46514506,
                 "longitude": 26.18085714,
                 "state": "minor"
               },
               {
                 "latitude": -51.19041903,
                 "longitude": -24.09198788,
                 "state": "minor"
               },
               {
                 "latitude": 23.48694451,
                 "longitude": 54.50451288,
                 "state": "minor"
               },
               {
                 "latitude": 54.34648219,
                 "longitude": -41.5321808,
                 "state": "minor"
               },
               {
                 "latitude": -2.50255841,
                 "longitude": -54.02978416,
                 "state": "minor"
               },
               {
                 "latitude": -13.93349425,
                 "longitude": 130.7612212,
                 "state": "minor"
               },
               {
                 "latitude": -46.53269256,
                 "longitude": 26.1627729,
                 "state": "minor"
               },
               {
                 "latitude": -76.68242872,
                 "longitude": -171.28658328,
                 "state": "minor"
               },
               {
                 "latitude": 64.71576441,
                 "longitude": 176.71408471,
                 "state": "minor"
               },
               {
                 "latitude": 66.88945164,
                 "longitude": 41.85555995,
                 "state": "minor"
               },
               {
                 "latitude": 26.31121141,
                 "longitude": -46.72346395,
                 "state": "minor"
               },
               {
                 "latitude": 11.5553617,
                 "longitude": -40.04910193,
                 "state": "minor"
               },
               {
                 "latitude": -1.60813954,
                 "longitude": -74.79535121,
                 "state": "minor"
               },
               {
                 "latitude": 27.09824981,
                 "longitude": 99.35911984,
                 "state": "minor"
               },
               {
                 "latitude": 45.88853479,
                 "longitude": -29.66279121,
                 "state": "minor"
               },
               {
                 "latitude": -20.73646232,
                 "longitude": -72.86352895,
                 "state": "minor"
               },
               {
                 "latitude": 68.49601619,
                 "longitude": -80.18541882,
                 "state": "minor"
               },
               {
                 "latitude": 20.34033077,
                 "longitude": 167.73450802,
                 "state": "minor"
               },
               {
                 "latitude": -68.79800565,
                 "longitude": -18.15990658,
                 "state": "minor"
               },
               {
                 "latitude": 24.53232841,
                 "longitude": -53.60813301,
                 "state": "minor"
               },
               {
                 "latitude": 29.48086135,
                 "longitude": 0.03159354,
                 "state": "minor"
               },
               {
                 "latitude": 46.90567746,
                 "longitude": -164.82486381,
                 "state": "minor"
               },
               {
                 "latitude": -13.24966534,
                 "longitude": -175.76774763,
                 "state": "minor"
               },
               {
                 "latitude": -49.24332277,
                 "longitude": 61.44026642,
                 "state": "minor"
               },
               {
                 "latitude": 3.76933705,
                 "longitude": 50.96419965,
                 "state": "minor"
               },
               {
                 "latitude": -53.11546056,
                 "longitude": 175.23794312,
                 "state": "minor"
               },
               {
                 "latitude": 6.75674822,
                 "longitude": -80.27779085,
                 "state": "minor"
               },
               {
                 "latitude": -42.59874241,
                 "longitude": -51.27936684,
                 "state": "minor"
               },
               {
                 "latitude": 41.07022002,
                 "longitude": -65.93660641,
                 "state": "minor"
               },
               {
                 "latitude": 33.32190648,
                 "longitude": -164.39411342,
                 "state": "minor"
               },
               {
                 "latitude": 20.51678151,
                 "longitude": 149.02939138,
                 "state": "minor"
               },
               {
                 "latitude": -30.17413169,
                 "longitude": 71.27661919,
                 "state": "minor"
               },
               {
                 "latitude": -73.07682594,
                 "longitude": 74.55133367,
                 "state": "minor"
               },
               {
                 "latitude": 27.40810165,
                 "longitude": 136.92267757,
                 "state": "minor"
               },
               {
                 "latitude": -30.9493921,
                 "longitude": -87.8269143,
                 "state": "minor"
               },
               {
                 "latitude": 75.92776928,
                 "longitude": 118.6052348,
                 "state": "minor"
               },
               {
                 "latitude": -35.20937329,
                 "longitude": -74.52441056,
                 "state": "minor"
               },
               {
                 "latitude": -73.79233691,
                 "longitude": 106.63600377,
                 "state": "minor"
               },
               {
                 "latitude": -6.65728444,
                 "longitude": -152.40193922,
                 "state": "minor"
               },
               {
                 "latitude": 2.4202087,
                 "longitude": -9.78085688,
                 "state": "minor"
               },
               {
                 "latitude": -60.01202237,
                 "longitude": 57.86011055,
                 "state": "minor"
               },
               {
                 "latitude": -60.56241686,
                 "longitude": -37.59125209,
                 "state": "minor"
               },
               {
                 "latitude": 73.08983964,
                 "longitude": 156.97358013,
                 "state": "minor"
               },
               {
                 "latitude": 48.98574732,
                 "longitude": 51.74499537,
                 "state": "minor"
               },
               {
                 "latitude": -27.47611325,
                 "longitude": -128.33675944,
                 "state": "minor"
               },
               {
                 "latitude": 30.7335525,
                 "longitude": -86.60042482,
                 "state": "minor"
               },
               {
                 "latitude": -35.2594199,
                 "longitude": 87.35631264,
                 "state": "minor"
               },
               {
                 "latitude": 37.5738342,
                 "longitude": -20.23938787,
                 "state": "minor"
               },
               {
                 "latitude": 11.11051187,
                 "longitude": -132.19848274,
                 "state": "minor"
               },
               {
                 "latitude": -31.62752887,
                 "longitude": 32.91281002,
                 "state": "minor"
               },
               {
                 "latitude": 75.35096697,
                 "longitude": 129.64330768,
                 "state": "minor"
               },
               {
                 "latitude": -43.38078794,
                 "longitude": -138.68314888,
                 "state": "minor"
               },
               {
                 "latitude": 39.94835364,
                 "longitude": -127.83736778,
                 "state": "minor"
               },
               {
                 "latitude": -64.81132553,
                 "longitude": -137.89369265,
                 "state": "minor"
               },
               {
                 "latitude": -27.21698446,
                 "longitude": -131.61800599,
                 "state": "minor"
               },
               {
                 "latitude": 15.5609612,
                 "longitude": -49.01160036,
                 "state": "minor"
               },
               {
                 "latitude": 17.74988107,
                 "longitude": -143.07494272,
                 "state": "minor"
               },
               {
                 "latitude": -19.27471725,
                 "longitude": -149.89414285,
                 "state": "minor"
               },
               {
                 "latitude": 0.66472824,
                 "longitude": 45.89693342,
                 "state": "minor"
               },
               {
                 "latitude": 37.3347135,
                 "longitude": -20.09054491,
                 "state": "minor"
               },
               {
                 "latitude": 2.79243472,
                 "longitude": -86.00446652,
                 "state": "minor"
               },
               {
                 "latitude": -47.26139596,
                 "longitude": -96.25505045,
                 "state": "minor"
               },
               {
                 "latitude": -15.79809241,
                 "longitude": 50.12605576,
                 "state": "minor"
               },
               {
                 "latitude": 27.18358987,
                 "longitude": -4.03112565,
                 "state": "minor"
               },
               {
                 "latitude": -33.47234865,
                 "longitude": -129.83077211,
                 "state": "minor"
               },
               {
                 "latitude": 4.18784766,
                 "longitude": -22.49777657,
                 "state": "minor"
               },
               {
                 "latitude": -2.23429276,
                 "longitude": -40.78430428,
                 "state": "minor"
               },
               {
                 "latitude": 57.35968072,
                 "longitude": -142.01392991,
                 "state": "minor"
               },
               {
                 "latitude": -47.38890531,
                 "longitude": 128.3748754,
                 "state": "minor"
               },
               {
                 "latitude": -63.39040515,
                 "longitude": -76.34799081,
                 "state": "minor"
               },
               {
                 "latitude": -53.98961633,
                 "longitude": -23.78254789,
                 "state": "minor"
               },
               {
                 "latitude": -42.592503,
                 "longitude": 134.02164263,
                 "state": "minor"
               },
               {
                 "latitude": -12.66873944,
                 "longitude": 167.0079382,
                 "state": "minor"
               },
               {
                 "latitude": -14.37765799,
                 "longitude": 39.03650309,
                 "state": "minor"
               },
               {
                 "latitude": 44.34321641,
                 "longitude": 34.62069455,
                 "state": "minor"
               },
               {
                 "latitude": 51.89900848,
                 "longitude": 154.64448718,
                 "state": "minor"
               },
               {
                 "latitude": -18.67926428,
                 "longitude": -80.55682149,
                 "state": "minor"
               },
               {
                 "latitude": 2.92753704,
                 "longitude": -174.14726538,
                 "state": "minor"
               },
               {
                 "latitude": 43.45368338,
                 "longitude": -135.55011502,
                 "state": "minor"
               },
               {
                 "latitude": -73.50831519,
                 "longitude": 62.75114794,
                 "state": "minor"
               },
               {
                 "latitude": -70.40093417,
                 "longitude": -159.98948578,
                 "state": "minor"
               },
               {
                 "latitude": 25.83747421,
                 "longitude": -135.69883969,
                 "state": "minor"
               },
               {
                 "latitude": -44.30562646,
                 "longitude": 28.37185853,
                 "state": "minor"
               },
               {
                 "latitude": -7.97381424,
                 "longitude": 17.68639777,
                 "state": "minor"
               },
               {
                 "latitude": 56.89269222,
                 "longitude": -23.32921151,
                 "state": "minor"
               },
               {
                 "latitude": -35.8140038,
                 "longitude": 158.53691987,
                 "state": "minor"
               },
               {
                 "latitude": 41.16169916,
                 "longitude": -140.61560034,
                 "state": "minor"
               },
               {
                 "latitude": -20.23883685,
                 "longitude": -82.64135936,
                 "state": "minor"
               },
               {
                 "latitude": 3.3136325,
                 "longitude": 6.09749765,
                 "state": "minor"
               },
               {
                 "latitude": 45.06747968,
                 "longitude": 74.23788752,
                 "state": "minor"
               },
               {
                 "latitude": -34.07151781,
                 "longitude": 179.05333499,
                 "state": "minor"
               },
               {
                 "latitude": 36.53224858,
                 "longitude": 179.77663254,
                 "state": "minor"
               },
               {
                 "latitude": 13.75528243,
                 "longitude": -125.4392929,
                 "state": "minor"
               },
               {
                 "latitude": 54.99018839,
                 "longitude": 114.83439751,
                 "state": "minor"
               },
               {
                 "latitude": -9.27449491,
                 "longitude": 128.25797024,
                 "state": "minor"
               },
               {
                 "latitude": -13.60705406,
                 "longitude": 12.39579269,
                 "state": "minor"
               },
               {
                 "latitude": 52.50288449,
                 "longitude": -145.4561015,
                 "state": "minor"
               },
               {
                 "latitude": -9.39110785,
                 "longitude": 170.81042385,
                 "state": "minor"
               },
               {
                 "latitude": -44.14606201,
                 "longitude": 90.24198443,
                 "state": "minor"
               },
               {
                 "latitude": -83.00538508,
                 "longitude": -68.64457129,
                 "state": "ok"
               },
               {
                 "latitude": 2.97494459,
                 "longitude": 179.60129066,
                 "state": "ok"
               },
               {
                 "latitude": 16.31103891,
                 "longitude": 109.96247558,
                 "state": "ok"
               },
               {
                 "latitude": -24.83127135,
                 "longitude": 133.80562542,
                 "state": "ok"
               },
               {
                 "latitude": -46.10757259,
                 "longitude": -55.43703436,
                 "state": "ok"
               },
               {
                 "latitude": 16.50091598,
                 "longitude": -73.76035521,
                 "state": "ok"
               },
               {
                 "latitude": -9.72942137,
                 "longitude": -133.3350352,
                 "state": "ok"
               },
               {
                 "latitude": 10.7245736,
                 "longitude": 100.55946247,
                 "state": "ok"
               },
               {
                 "latitude": -4.52776035,
                 "longitude": -32.21777807,
                 "state": "ok"
               },
               {
                 "latitude": 48.58635023,
                 "longitude": -152.88812344,
                 "state": "ok"
               },
               {
                 "latitude": 23.27649901,
                 "longitude": 38.49962605,
                 "state": "ok"
               },
               {
                 "latitude": 24.98181227,
                 "longitude": 26.82427213,
                 "state": "ok"
               },
               {
                 "latitude": -68.94807046,
                 "longitude": -36.88738302,
                 "state": "ok"
               },
               {
                 "latitude": -38.29237028,
                 "longitude": 58.9086778,
                 "state": "ok"
               },
               {
                 "latitude": -22.01337316,
                 "longitude": -22.8693714,
                 "state": "ok"
               },
               {
                 "latitude": -0.47559791,
                 "longitude": -150.91125977,
                 "state": "ok"
               },
               {
                 "latitude": -36.37805323,
                 "longitude": 24.55349149,
                 "state": "ok"
               },
               {
                 "latitude": 13.7412082,
                 "longitude": -84.64922729,
                 "state": "ok"
               },
               {
                 "latitude": -84.62109977,
                 "longitude": -6.45971616,
                 "state": "ok"
               },
               {
                 "latitude": -52.95072824,
                 "longitude": 101.3004136,
                 "state": "ok"
               },
               {
                 "latitude": -27.13021527,
                 "longitude": 121.76476753,
                 "state": "ok"
               },
               {
                 "latitude": -32.72277562,
                 "longitude": -123.9102567,
                 "state": "ok"
               },
               {
                 "latitude": -54.38036037,
                 "longitude": 114.7871336,
                 "state": "ok"
               },
               {
                 "latitude": -4.94353862,
                 "longitude": 25.88449764,
                 "state": "ok"
               },
               {
                 "latitude": 28.2998344,
                 "longitude": -113.64923652,
                 "state": "ok"
               },
               {
                 "latitude": -49.1247419,
                 "longitude": -72.33593251,
                 "state": "ok"
               },
               {
                 "latitude": 3.0828095,
                 "longitude": 21.55483512,
                 "state": "ok"
               },
               {
                 "latitude": 14.6066045,
                 "longitude": 13.15843656,
                 "state": "ok"
               },
               {
                 "latitude": -58.31565319,
                 "longitude": 86.63199998,
                 "state": "ok"
               },
               {
                 "latitude": 13.21404015,
                 "longitude": -136.7453604,
                 "state": "ok"
               },
               {
                 "latitude": 63.37508327,
                 "longitude": -171.33108199,
                 "state": "ok"
               },
               {
                 "latitude": -23.56410927,
                 "longitude": 59.57291369,
                 "state": "ok"
               },
               {
                 "latitude": 5.99467156,
                 "longitude": -138.08969461,
                 "state": "ok"
               },
               {
                 "latitude": -24.62251011,
                 "longitude": -161.98507432,
                 "state": "ok"
               },
               {
                 "latitude": -58.06898222,
                 "longitude": -11.85813924,
                 "state": "ok"
               },
               {
                 "latitude": 51.23655766,
                 "longitude": 111.28179488,
                 "state": "ok"
               },
               {
                 "latitude": -26.13414762,
                 "longitude": -23.55855721,
                 "state": "ok"
               },
               {
                 "latitude": 9.58792223,
                 "longitude": 139.06248769,
                 "state": "ok"
               },
               {
                 "latitude": 12.06540151,
                 "longitude": -56.32764858,
                 "state": "ok"
               },
               {
                 "latitude": 58.35734798,
                 "longitude": -124.29347446,
                 "state": "ok"
               },
               {
                 "latitude": 41.66635309,
                 "longitude": 62.76446644,
                 "state": "ok"
               },
               {
                 "latitude": 5.09871279,
                 "longitude": -14.18099603,
                 "state": "ok"
               },
               {
                 "latitude": -30.39811062,
                 "longitude": -116.79855972,
                 "state": "ok"
               },
               {
                 "latitude": -2.37151149,
                 "longitude": -90.2858234,
                 "state": "ok"
               },
               {
                 "latitude": 60.98378809,
                 "longitude": -175.50799982,
                 "state": "ok"
               },
               {
                 "latitude": 51.84870848,
                 "longitude": -165.26932487,
                 "state": "ok"
               },
               {
                 "latitude": 52.25591951,
                 "longitude": 68.81473295,
                 "state": "ok"
               },
               {
                 "latitude": 34.29851202,
                 "longitude": 14.91140916,
                 "state": "ok"
               },
               {
                 "latitude": -18.28291711,
                 "longitude": -154.19772264,
                 "state": "ok"
               },
               {
                 "latitude": 36.4121548,
                 "longitude": -130.14321017,
                 "state": "ok"
               },
               {
                 "latitude": -0.29759958,
                 "longitude": -130.15688366,
                 "state": "ok"
               },
               {
                 "latitude": -31.78856883,
                 "longitude": -104.40669993,
                 "state": "ok"
               },
               {
                 "latitude": 63.06617631,
                 "longitude": 54.21020907,
                 "state": "ok"
               },
               {
                 "latitude": 17.59614094,
                 "longitude": 89.34721776,
                 "state": "ok"
               },
               {
                 "latitude": 46.53846445,
                 "longitude": 78.4829824,
                 "state": "ok"
               },
               {
                 "latitude": 64.46895103,
                 "longitude": 149.71504473,
                 "state": "ok"
               },
               {
                 "latitude": 70.36551568,
                 "longitude": -132.24995941,
                 "state": "ok"
               },
               {
                 "latitude": 53.91942681,
                 "longitude": -162.78478266,
                 "state": "ok"
               },
               {
                 "latitude": -36.80387892,
                 "longitude": -127.81353364,
                 "state": "ok"
               },
               {
                 "latitude": 31.36454434,
                 "longitude": 135.02515126,
                 "state": "ok"
               },
               {
                 "latitude": 18.1213069,
                 "longitude": 141.38502048,
                 "state": "ok"
               },
               {
                 "latitude": 21.30084452,
                 "longitude": 44.4315813,
                 "state": "ok"
               },
               {
                 "latitude": -61.17081506,
                 "longitude": 126.96587433,
                 "state": "ok"
               },
               {
                 "latitude": 63.2472293,
                 "longitude": 51.37974387,
                 "state": "ok"
               },
               {
                 "latitude": -66.83953677,
                 "longitude": 27.88921322,
                 "state": "ok"
               },
               {
                 "latitude": -37.27816573,
                 "longitude": 23.46281929,
                 "state": "ok"
               },
               {
                 "latitude": -45.77564823,
                 "longitude": 27.94505581,
                 "state": "ok"
               },
               {
                 "latitude": -67.86790696,
                 "longitude": -108.09493753,
                 "state": "ok"
               },
               {
                 "latitude": -39.28737377,
                 "longitude": 132.94736933,
                 "state": "ok"
               },
               {
                 "latitude": 16.93060232,
                 "longitude": 13.30381358,
                 "state": "ok"
               },
               {
                 "latitude": 31.91465337,
                 "longitude": 2.2832379,
                 "state": "ok"
               },
               {
                 "latitude": 9.04622664,
                 "longitude": -135.00407018,
                 "state": "ok"
               },
               {
                 "latitude": -1.13757,
                 "longitude": -54.30994086,
                 "state": "ok"
               },
               {
                 "latitude": -51.61902602,
                 "longitude": -152.15090632,
                 "state": "ok"
               },
               {
                 "latitude": -11.72563713,
                 "longitude": -158.96168375,
                 "state": "ok"
               },
               {
                 "latitude": 9.67915871,
                 "longitude": -83.11852562,
                 "state": "ok"
               },
               {
                 "latitude": 12.08821559,
                 "longitude": 176.03288313,
                 "state": "ok"
               },
               {
                 "latitude": 41.7355807,
                 "longitude": 162.67158055,
                 "state": "ok"
               },
               {
                 "latitude": 5.41098942,
                 "longitude": 173.74936114,
                 "state": "ok"
               },
               {
                 "latitude": -4.91325022,
                 "longitude": -12.90299072,
                 "state": "ok"
               },
               {
                 "latitude": 54.41922771,
                 "longitude": -93.19922969,
                 "state": "ok"
               },
               {
                 "latitude": -1.53849207,
                 "longitude": 48.80840703,
                 "state": "ok"
               },
               {
                 "latitude": -73.69534749,
                 "longitude": 6.77624277,
                 "state": "ok"
               },
               {
                 "latitude": 42.54136451,
                 "longitude": 55.91479964,
                 "state": "ok"
               },
               {
                 "latitude": -39.69685367,
                 "longitude": 85.08671175,
                 "state": "ok"
               },
               {
                 "latitude": 39.13975095,
                 "longitude": -59.47609183,
                 "state": "ok"
               },
               {
                 "latitude": -11.13318608,
                 "longitude": 159.31342817,
                 "state": "ok"
               },
               {
                 "latitude": -58.7387234,
                 "longitude": -126.41374455,
                 "state": "ok"
               },
               {
                 "latitude": 32.11331317,
                 "longitude": -40.00517864,
                 "state": "ok"
               },
               {
                 "latitude": 36.74141338,
                 "longitude": 95.84286911,
                 "state": "ok"
               },
               {
                 "latitude": -40.78213952,
                 "longitude": 115.98516385,
                 "state": "ok"
               },
               {
                 "latitude": 22.80112607,
                 "longitude": -121.1283707,
                 "state": "ok"
               },
               {
                 "latitude": -45.22039469,
                 "longitude": -105.02977649,
                 "state": "ok"
               },
               {
                 "latitude": -30.94440598,
                 "longitude": 22.4337484,
                 "state": "ok"
               },
               {
                 "latitude": -40.49469339,
                 "longitude": 117.15698992,
                 "state": "ok"
               },
               {
                 "latitude": -50.47631594,
                 "longitude": -144.48509695,
                 "state": "ok"
               },
               {
                 "latitude": 46.45365804,
                 "longitude": -67.91784029,
                 "state": "ok"
               },
               {
                 "latitude": -41.80359588,
                 "longitude": 13.67240816,
                 "state": "ok"
               },
               {
                 "latitude": 58.8507997,
                 "longitude": 70.08333512,
                 "state": "ok"
               },
               {
                 "latitude": 25.35422158,
                 "longitude": 34.71739203,
                 "state": "ok"
               },
               {
                 "latitude": -12.7033695,
                 "longitude": 127.6002499,
                 "state": "ok"
               },
               {
                 "latitude": -30.93055813,
                 "longitude": -91.76130289,
                 "state": "ok"
               },
               {
                 "latitude": 32.86322081,
                 "longitude": 139.12847401,
                 "state": "ok"
               },
               {
                 "latitude": -43.57541788,
                 "longitude": -145.15923777,
                 "state": "ok"
               },
               {
                 "latitude": -42.33314777,
                 "longitude": 109.12967915,
                 "state": "ok"
               },
               {
                 "latitude": -35.74610993,
                 "longitude": -7.06307306,
                 "state": "ok"
               },
               {
                 "latitude": 11.54463943,
                 "longitude": -154.16699599,
                 "state": "ok"
               },
               {
                 "latitude": -2.4291463,
                 "longitude": -70.07138039,
                 "state": "ok"
               },
               {
                 "latitude": -44.69372346,
                 "longitude": -138.25943576,
                 "state": "ok"
               },
               {
                 "latitude": -25.03700963,
                 "longitude": 77.38479788,
                 "state": "ok"
               },
               {
                 "latitude": 87.03975556,
                 "longitude": -81.92993745,
                 "state": "ok"
               },
               {
                 "latitude": 55.23718562,
                 "longitude": -142.54740964,
                 "state": "ok"
               },
               {
                 "latitude": -29.31459792,
                 "longitude": -85.77857324,
                 "state": "ok"
               },
               {
                 "latitude": -41.33649733,
                 "longitude": -32.91561916,
                 "state": "ok"
               },
               {
                 "latitude": -48.65295726,
                 "longitude": 93.35328979,
                 "state": "ok"
               },
               {
                 "latitude": 5.66956627,
                 "longitude": 12.98696691,
                 "state": "ok"
               },
               {
                 "latitude": 30.3910483,
                 "longitude": -18.6697022,
                 "state": "ok"
               },
               {
                 "latitude": -40.18256121,
                 "longitude": -172.90421639,
                 "state": "ok"
               },
               {
                 "latitude": 20.31403902,
                 "longitude": 50.35590081,
                 "state": "ok"
               },
               {
                 "latitude": -6.66186373,
                 "longitude": -28.26108139,
                 "state": "ok"
               },
               {
                 "latitude": 17.11174819,
                 "longitude": -174.39775695,
                 "state": "ok"
               },
               {
                 "latitude": -44.8558468,
                 "longitude": -44.01876459,
                 "state": "ok"
               },
               {
                 "latitude": -22.07260639,
                 "longitude": -25.84417922,
                 "state": "ok"
               },
               {
                 "latitude": -46.69059821,
                 "longitude": -117.70237749,
                 "state": "ok"
               },
               {
                 "latitude": 21.61626327,
                 "longitude": -64.31087784,
                 "state": "ok"
               },
               {
                 "latitude": 41.3873996,
                 "longitude": -40.5699561,
                 "state": "ok"
               },
               {
                 "latitude": 65.72111561,
                 "longitude": 50.67415165,
                 "state": "ok"
               },
               {
                 "latitude": 11.27433955,
                 "longitude": 42.12259959,
                 "state": "ok"
               },
               {
                 "latitude": -59.64392818,
                 "longitude": 28.65781068,
                 "state": "ok"
               },
               {
                 "latitude": 7.37060863,
                 "longitude": -126.16925306,
                 "state": "ok"
               },
               {
                 "latitude": -60.66450095,
                 "longitude": -104.08863271,
                 "state": "ok"
               },
               {
                 "latitude": -31.54833167,
                 "longitude": 173.334503,
                 "state": "ok"
               },
               {
                 "latitude": -11.43653044,
                 "longitude": 106.59885954,
                 "state": "ok"
               },
               {
                 "latitude": 26.6880889,
                 "longitude": 34.31831338,
                 "state": "ok"
               },
               {
                 "latitude": 36.47685099,
                 "longitude": 39.41958204,
                 "state": "ok"
               },
               {
                 "latitude": 1.77998925,
                 "longitude": -130.50763924,
                 "state": "ok"
               },
               {
                 "latitude": 26.67278233,
                 "longitude": -172.18129629,
                 "state": "ok"
               },
               {
                 "latitude": -43.95981665,
                 "longitude": -15.41972247,
                 "state": "ok"
               },
               {
                 "latitude": 1.54648669,
                 "longitude": -152.83154829,
                 "state": "ok"
               },
               {
                 "latitude": 5.38311365,
                 "longitude": 132.19074619,
                 "state": "ok"
               },
               {
                 "latitude": -24.21186255,
                 "longitude": -124.17470054,
                 "state": "ok"
               },
               {
                 "latitude": 73.62028062,
                 "longitude": 123.02057818,
                 "state": "ok"
               },
               {
                 "latitude": 11.14752652,
                 "longitude": 76.9988359,
                 "state": "ok"
               },
               {
                 "latitude": 75.09754376,
                 "longitude": 45.72203447,
                 "state": "ok"
               },
               {
                 "latitude": -22.0186326,
                 "longitude": -123.9750049,
                 "state": "ok"
               },
               {
                 "latitude": -12.1692906,
                 "longitude": -116.49156278,
                 "state": "ok"
               },
               {
                 "latitude": 2.05184072,
                 "longitude": -63.907988,
                 "state": "ok"
               },
               {
                 "latitude": 50.91983501,
                 "longitude": -35.21567712,
                 "state": "ok"
               },
               {
                 "latitude": -40.7150423,
                 "longitude": 60.44328796,
                 "state": "ok"
               },
               {
                 "latitude": -6.22413053,
                 "longitude": -151.52661838,
                 "state": "ok"
               },
               {
                 "latitude": 48.02142582,
                 "longitude": -85.57595323,
                 "state": "ok"
               },
               {
                 "latitude": -23.8680455,
                 "longitude": 64.53853792,
                 "state": "ok"
               },
               {
                 "latitude": 14.9381402,
                 "longitude": -123.1102088,
                 "state": "ok"
               },
               {
                 "latitude": -17.92203085,
                 "longitude": -83.57354022,
                 "state": "ok"
               },
               {
                 "latitude": -36.67914894,
                 "longitude": -158.54058297,
                 "state": "ok"
               },
               {
                 "latitude": -69.92511771,
                 "longitude": 122.80764465,
                 "state": "ok"
               },
               {
                 "latitude": -24.93207373,
                 "longitude": -164.38897937,
                 "state": "ok"
               },
               {
                 "latitude": -77.28246371,
                 "longitude": -87.57540723,
                 "state": "ok"
               },
               {
                 "latitude": -52.72980613,
                 "longitude": 86.86906829,
                 "state": "ok"
               },
               {
                 "latitude": 58.88236809,
                 "longitude": 96.97721089,
                 "state": "ok"
               },
               {
                 "latitude": -7.23816286,
                 "longitude": -131.68260114,
                 "state": "ok"
               },
               {
                 "latitude": 20.20982667,
                 "longitude": 18.72191997,
                 "state": "ok"
               },
               {
                 "latitude": 25.55780314,
                 "longitude": -40.67090032,
                 "state": "ok"
               },
               {
                 "latitude": 8.88326845,
                 "longitude": -24.92515074,
                 "state": "ok"
               },
               {
                 "latitude": -20.67943788,
                 "longitude": 98.54009195,
                 "state": "ok"
               },
               {
                 "latitude": -24.61383013,
                 "longitude": -76.03050864,
                 "state": "ok"
               },
               {
                 "latitude": -0.81263578,
                 "longitude": -148.91779528,
                 "state": "ok"
               },
               {
                 "latitude": 21.40314599,
                 "longitude": -31.99454334,
                 "state": "ok"
               },
               {
                 "latitude": 34.21022339,
                 "longitude": -50.52141752,
                 "state": "ok"
               },
               {
                 "latitude": 14.21335566,
                 "longitude": -93.87671472,
                 "state": "ok"
               },
               {
                 "latitude": 20.75973899,
                 "longitude": -173.69455222,
                 "state": "ok"
               },
               {
                 "latitude": -29.91736918,
                 "longitude": -93.85038267,
                 "state": "ok"
               },
               {
                 "latitude": 45.28539194,
                 "longitude": -133.40369201,
                 "state": "ok"
               },
               {
                 "latitude": -5.42689938,
                 "longitude": -142.2399362,
                 "state": "ok"
               },
               {
                 "latitude": -8.87592581,
                 "longitude": 152.21906419,
                 "state": "ok"
               },
               {
                 "latitude": 2.02099656,
                 "longitude": -14.84045696,
                 "state": "ok"
               },
               {
                 "latitude": -42.88903325,
                 "longitude": 47.61593426,
                 "state": "ok"
               },
               {
                 "latitude": -55.74552428,
                 "longitude": 133.16097464,
                 "state": "ok"
               },
               {
                 "latitude": 2.58621781,
                 "longitude": -152.15414301,
                 "state": "ok"
               },
               {
                 "latitude": 77.69875214,
                 "longitude": -110.61488503,
                 "state": "ok"
               },
               {
                 "latitude": -69.20074159,
                 "longitude": -96.74692,
                 "state": "ok"
               },
               {
                 "latitude": 53.80887906,
                 "longitude": -59.49914954,
                 "state": "ok"
               },
               {
                 "latitude": -23.95120562,
                 "longitude": 166.11760961,
                 "state": "ok"
               },
               {
                 "latitude": -8.7442867,
                 "longitude": 39.0293663,
                 "state": "ok"
               },
               {
                 "latitude": 21.0239283,
                 "longitude": -80.39454572,
                 "state": "ok"
               },
               {
                 "latitude": -49.13778377,
                 "longitude": 5.1585795,
                 "state": "ok"
               },
               {
                 "latitude": 29.57554302,
                 "longitude": 15.36602224,
                 "state": "ok"
               },
               {
                 "latitude": -35.83787527,
                 "longitude": -22.66726116,
                 "state": "ok"
               },
               {
                 "latitude": -9.18391301,
                 "longitude": 96.27325304,
                 "state": "ok"
               },
               {
                 "latitude": -22.82931302,
                 "longitude": 79.54623399,
                 "state": "ok"
               },
               {
                 "latitude": -13.49204121,
                 "longitude": -20.84428595,
                 "state": "ok"
               },
               {
                 "latitude": -36.96864794,
                 "longitude": -28.29162893,
                 "state": "ok"
               },
               {
                 "latitude": 27.99981453,
                 "longitude": 78.74725676,
                 "state": "ok"
               },
               {
                 "latitude": -56.29589862,
                 "longitude": -57.15558692,
                 "state": "ok"
               },
               {
                 "latitude": 21.13080359,
                 "longitude": -177.16958195,
                 "state": "ok"
               },
               {
                 "latitude": -81.16940189,
                 "longitude": -88.98396016,
                 "state": "ok"
               },
               {
                 "latitude": 20.08197828,
                 "longitude": 115.64380847,
                 "state": "ok"
               },
               {
                 "latitude": 13.40040584,
                 "longitude": -171.57051086,
                 "state": "ok"
               },
               {
                 "latitude": 24.20088221,
                 "longitude": -124.89361703,
                 "state": "ok"
               },
               {
                 "latitude": 10.14477062,
                 "longitude": -146.68968016,
                 "state": "ok"
               },
               {
                 "latitude": -53.45128182,
                 "longitude": 74.70720701,
                 "state": "ok"
               },
               {
                 "latitude": -19.96574849,
                 "longitude": -103.49133342,
                 "state": "ok"
               },
               {
                 "latitude": -13.42759125,
                 "longitude": 158.69544794,
                 "state": "ok"
               },
               {
                 "latitude": -0.08161005,
                 "longitude": -58.8800479,
                 "state": "ok"
               },
               {
                 "latitude": 6.78626489,
                 "longitude": 90.61678252,
                 "state": "ok"
               },
               {
                 "latitude": 8.43351545,
                 "longitude": 31.29151726,
                 "state": "ok"
               },
               {
                 "latitude": -29.40376963,
                 "longitude": -149.25566259,
                 "state": "ok"
               },
               {
                 "latitude": -27.29922215,
                 "longitude": 49.80071718,
                 "state": "ok"
               },
               {
                 "latitude": 49.59834659,
                 "longitude": 170.33169007,
                 "state": "ok"
               },
               {
                 "latitude": -19.50779523,
                 "longitude": 146.53543679,
                 "state": "ok"
               },
               {
                 "latitude": 2.19615289,
                 "longitude": 5.53670728,
                 "state": "ok"
               },
               {
                 "latitude": -19.13523431,
                 "longitude": 125.79805956,
                 "state": "ok"
               },
               {
                 "latitude": 13.40029675,
                 "longitude": 3.8423495,
                 "state": "ok"
               },
               {
                 "latitude": -14.28044442,
                 "longitude": 32.92995735,
                 "state": "ok"
               },
               {
                 "latitude": 45.19571491,
                 "longitude": -159.49810344,
                 "state": "ok"
               },
               {
                 "latitude": 6.1094741,
                 "longitude": -44.1025607,
                 "state": "ok"
               },
               {
                 "latitude": -35.13974518,
                 "longitude": 114.11508946,
                 "state": "ok"
               },
               {
                 "latitude": 29.28892743,
                 "longitude": -122.19177651,
                 "state": "ok"
               },
               {
                 "latitude": -12.38010613,
                 "longitude": -143.79845182,
                 "state": "ok"
               },
               {
                 "latitude": 18.15467313,
                 "longitude": 143.40035372,
                 "state": "ok"
               },
               {
                 "latitude": -39.0112022,
                 "longitude": 125.38290188,
                 "state": "ok"
               },
               {
                 "latitude": 6.20125776,
                 "longitude": 30.31946883,
                 "state": "ok"
               },
               {
                 "latitude": 18.07928042,
                 "longitude": 151.98763396,
                 "state": "ok"
               },
               {
                 "latitude": -12.35653207,
                 "longitude": -103.8428111,
                 "state": "ok"
               },
               {
                 "latitude": 31.81580864,
                 "longitude": 104.72624809,
                 "state": "ok"
               },
               {
                 "latitude": -18.78283291,
                 "longitude": 98.77971295,
                 "state": "ok"
               },
               {
                 "latitude": 28.77453009,
                 "longitude": 2.64225411,
                 "state": "ok"
               },
               {
                 "latitude": -64.10531818,
                 "longitude": -108.31151208,
                 "state": "ok"
               },
               {
                 "latitude": 28.04845529,
                 "longitude": 158.87918952,
                 "state": "ok"
               },
               {
                 "latitude": -12.54675037,
                 "longitude": 136.31023054,
                 "state": "ok"
               },
               {
                 "latitude": -2.84236482,
                 "longitude": 146.73449879,
                 "state": "ok"
               },
               {
                 "latitude": -20.72710788,
                 "longitude": 131.10492422,
                 "state": "ok"
               },
               {
                 "latitude": -0.08416968,
                 "longitude": -154.50235904,
                 "state": "ok"
               },
               {
                 "latitude": -5.71077643,
                 "longitude": -54.78117153,
                 "state": "ok"
               },
               {
                 "latitude": 12.60157893,
                 "longitude": 81.47187566,
                 "state": "ok"
               },
               {
                 "latitude": -12.09669726,
                 "longitude": -27.75096795,
                 "state": "ok"
               },
               {
                 "latitude": -35.00243031,
                 "longitude": -110.78668261,
                 "state": "ok"
               },
               {
                 "latitude": -56.06770999,
                 "longitude": 88.27555275,
                 "state": "ok"
               },
               {
                 "latitude": -71.81009635,
                 "longitude": 30.49436958,
                 "state": "ok"
               },
               {
                 "latitude": -47.47131319,
                 "longitude": 87.87477883,
                 "state": "ok"
               },
               {
                 "latitude": 8.08822057,
                 "longitude": -82.08105715,
                 "state": "ok"
               },
               {
                 "latitude": 47.05588638,
                 "longitude": 171.33378392,
                 "state": "ok"
               },
               {
                 "latitude": 20.20057284,
                 "longitude": -131.54100236,
                 "state": "ok"
               },
               {
                 "latitude": -54.80500666,
                 "longitude": 119.60953525,
                 "state": "ok"
               },
               {
                 "latitude": 66.03640606,
                 "longitude": -101.25959191,
                 "state": "ok"
               },
               {
                 "latitude": -28.71062925,
                 "longitude": -128.33162295,
                 "state": "ok"
               },
               {
                 "latitude": -16.60740718,
                 "longitude": 52.49616912,
                 "state": "ok"
               },
               {
                 "latitude": 55.23738211,
                 "longitude": 94.63782883,
                 "state": "ok"
               },
               {
                 "latitude": 46.9971014,
                 "longitude": 93.84052076,
                 "state": "ok"
               },
               {
                 "latitude": 32.91722038,
                 "longitude": 128.4230925,
                 "state": "ok"
               },
               {
                 "latitude": -39.84986156,
                 "longitude": 36.30676312,
                 "state": "ok"
               },
               {
                 "latitude": 52.89381327,
                 "longitude": 58.41425496,
                 "state": "ok"
               },
               {
                 "latitude": 15.82139946,
                 "longitude": 45.42523071,
                 "state": "ok"
               },
               {
                 "latitude": 71.16825494,
                 "longitude": -115.11858865,
                 "state": "ok"
               },
               {
                 "latitude": -36.63390543,
                 "longitude": -59.51747568,
                 "state": "ok"
               },
               {
                 "latitude": 25.58416997,
                 "longitude": 86.63111322,
                 "state": "ok"
               },
               {
                 "latitude": -54.50156132,
                 "longitude": -167.45997535,
                 "state": "ok"
               },
               {
                 "latitude": -31.80093598,
                 "longitude": -136.83872627,
                 "state": "ok"
               },
               {
                 "latitude": 45.23600374,
                 "longitude": -104.01323997,
                 "state": "ok"
               },
               {
                 "latitude": 46.19473945,
                 "longitude": -162.13865269,
                 "state": "ok"
               },
               {
                 "latitude": 10.9352524,
                 "longitude": -131.30760082,
                 "state": "ok"
               },
               {
                 "latitude": -2.75106351,
                 "longitude": 75.06967269,
                 "state": "ok"
               },
               {
                 "latitude": 12.01663062,
                 "longitude": -78.9283733,
                 "state": "ok"
               },
               {
                 "latitude": 46.24711308,
                 "longitude": 66.57215944,
                 "state": "ok"
               },
               {
                 "latitude": 30.88710093,
                 "longitude": -82.74113728,
                 "state": "ok"
               },
               {
                 "latitude": 5.5294007,
                 "longitude": 82.31172718,
                 "state": "ok"
               },
               {
                 "latitude": -2.53773016,
                 "longitude": 80.93668613,
                 "state": "ok"
               },
               {
                 "latitude": -56.29963252,
                 "longitude": -21.5956083,
                 "state": "ok"
               },
               {
                 "latitude": -40.02562632,
                 "longitude": -78.85413975,
                 "state": "ok"
               },
               {
                 "latitude": -22.31337189,
                 "longitude": 90.60651769,
                 "state": "ok"
               },
               {
                 "latitude": 31.65095174,
                 "longitude": 31.37512636,
                 "state": "ok"
               },
               {
                 "latitude": 33.87211492,
                 "longitude": 81.82113291,
                 "state": "ok"
               },
               {
                 "latitude": 4.82019304,
                 "longitude": 78.87588778,
                 "state": "ok"
               },
               {
                 "latitude": 17.22340693,
                 "longitude": 47.90895099,
                 "state": "ok"
               },
               {
                 "latitude": -42.19586893,
                 "longitude": 37.27430919,
                 "state": "ok"
               },
               {
                 "latitude": -58.11420371,
                 "longitude": 7.88597955,
                 "state": "ok"
               },
               {
                 "latitude": 51.20595406,
                 "longitude": 130.57867741,
                 "state": "ok"
               },
               {
                 "latitude": 47.37428357,
                 "longitude": -51.65180444,
                 "state": "ok"
               },
               {
                 "latitude": -3.20565134,
                 "longitude": 30.94236221,
                 "state": "ok"
               },
               {
                 "latitude": 14.11888998,
                 "longitude": -80.83573732,
                 "state": "ok"
               },
               {
                 "latitude": 54.88014713,
                 "longitude": -141.80742829,
                 "state": "ok"
               },
               {
                 "latitude": 50.67314599,
                 "longitude": -122.89443966,
                 "state": "ok"
               },
               {
                 "latitude": -46.37414801,
                 "longitude": 128.31898724,
                 "state": "ok"
               },
               {
                 "latitude": 27.97022312,
                 "longitude": -28.29139612,
                 "state": "ok"
               },
               {
                 "latitude": -42.1117269,
                 "longitude": 23.14212873,
                 "state": "ok"
               },
               {
                 "latitude": -71.52113602,
                 "longitude": -119.69962352,
                 "state": "ok"
               },
               {
                 "latitude": 39.98340259,
                 "longitude": -82.3027502,
                 "state": "ok"
               },
               {
                 "latitude": 11.70194092,
                 "longitude": 92.11403905,
                 "state": "ok"
               },
               {
                 "latitude": -11.70588038,
                 "longitude": -108.91482267,
                 "state": "ok"
               },
               {
                 "latitude": 8.30485645,
                 "longitude": 85.3162166,
                 "state": "ok"
               },
               {
                 "latitude": 64.99791819,
                 "longitude": 106.5600063,
                 "state": "ok"
               },
               {
                 "latitude": 9.44821467,
                 "longitude": 89.59424352,
                 "state": "ok"
               },
               {
                 "latitude": 7.90162527,
                 "longitude": -100.75303157,
                 "state": "ok"
               },
               {
                 "latitude": 8.92319317,
                 "longitude": -146.80764282,
                 "state": "ok"
               },
               {
                 "latitude": 52.51301045,
                 "longitude": -98.6492597,
                 "state": "ok"
               },
               {
                 "latitude": -33.71638111,
                 "longitude": -7.45284208,
                 "state": "ok"
               },
               {
                 "latitude": -27.41816295,
                 "longitude": 7.59848276,
                 "state": "ok"
               },
               {
                 "latitude": 8.32832439,
                 "longitude": -60.0603088,
                 "state": "ok"
               },
               {
                 "latitude": -60.14527301,
                 "longitude": -111.92192934,
                 "state": "ok"
               },
               {
                 "latitude": -22.54371271,
                 "longitude": 111.34172225,
                 "state": "ok"
               },
               {
                 "latitude": -50.81866371,
                 "longitude": 122.61285311,
                 "state": "ok"
               },
               {
                 "latitude": -27.32777977,
                 "longitude": 175.7182411,
                 "state": "ok"
               },
               {
                 "latitude": -72.47995686,
                 "longitude": -132.36336479,
                 "state": "ok"
               },
               {
                 "latitude": -31.76353303,
                 "longitude": 114.16649829,
                 "state": "ok"
               },
               {
                 "latitude": 19.80065084,
                 "longitude": -165.55939268,
                 "state": "ok"
               },
               {
                 "latitude": -28.15738727,
                 "longitude": -167.16049003,
                 "state": "ok"
               },
               {
                 "latitude": 30.74182112,
                 "longitude": -169.05979978,
                 "state": "ok"
               },
               {
                 "latitude": -64.1675969,
                 "longitude": 32.11937708,
                 "state": "ok"
               },
               {
                 "latitude": -0.96702236,
                 "longitude": -72.42244335,
                 "state": "ok"
               },
               {
                 "latitude": -3.81000893,
                 "longitude": 145.6198588,
                 "state": "ok"
               },
               {
                 "latitude": 11.22946248,
                 "longitude": 105.14527764,
                 "state": "ok"
               },
               {
                 "latitude": 46.98902019,
                 "longitude": -96.58924935,
                 "state": "ok"
               },
               {
                 "latitude": -32.43149986,
                 "longitude": -93.94901802,
                 "state": "ok"
               },
               {
                 "latitude": 73.35368691,
                 "longitude": 96.5204612,
                 "state": "ok"
               },
               {
                 "latitude": 49.84218249,
                 "longitude": 104.40175311,
                 "state": "ok"
               },
               {
                 "latitude": 45.14714814,
                 "longitude": 31.65558465,
                 "state": "ok"
               },
               {
                 "latitude": 14.57988574,
                 "longitude": 94.27377292,
                 "state": "ok"
               },
               {
                 "latitude": -9.30718486,
                 "longitude": -143.76340963,
                 "state": "ok"
               },
               {
                 "latitude": -9.36280384,
                 "longitude": -127.76824516,
                 "state": "ok"
               },
               {
                 "latitude": -5.83008935,
                 "longitude": -30.12608789,
                 "state": "ok"
               },
               {
                 "latitude": -79.77274709,
                 "longitude": -161.02605014,
                 "state": "ok"
               },
               {
                 "latitude": -34.38171172,
                 "longitude": 48.54926259,
                 "state": "ok"
               },
               {
                 "latitude": 0.7231197,
                 "longitude": 147.56037029,
                 "state": "ok"
               },
               {
                 "latitude": 25.96734253,
                 "longitude": 42.50003081,
                 "state": "ok"
               },
               {
                 "latitude": 24.28035952,
                 "longitude": 72.25525826,
                 "state": "ok"
               },
               {
                 "latitude": 1.70786697,
                 "longitude": 136.10972047,
                 "state": "ok"
               },
               {
                 "latitude": 50.80288967,
                 "longitude": -86.43657772,
                 "state": "ok"
               },
               {
                 "latitude": -15.56077821,
                 "longitude": 108.12632685,
                 "state": "ok"
               },
               {
                 "latitude": -7.85657917,
                 "longitude": 174.78446837,
                 "state": "ok"
               },
               {
                 "latitude": 33.03754658,
                 "longitude": 143.6373027,
                 "state": "ok"
               },
               {
                 "latitude": 21.12937722,
                 "longitude": -172.06558033,
                 "state": "ok"
               },
               {
                 "latitude": -81.60897715,
                 "longitude": -18.79297955,
                 "state": "ok"
               },
               {
                 "latitude": 54.35135772,
                 "longitude": -14.19001747,
                 "state": "ok"
               },
               {
                 "latitude": -50.2392845,
                 "longitude": 177.3142157,
                 "state": "ok"
               },
               {
                 "latitude": -19.78474146,
                 "longitude": 26.23090808,
                 "state": "ok"
               },
               {
                 "latitude": 49.6011243,
                 "longitude": -177.93594093,
                 "state": "ok"
               },
               {
                 "latitude": 5.98130021,
                 "longitude": 67.59641284,
                 "state": "ok"
               },
               {
                 "latitude": -2.97013681,
                 "longitude": -178.78623129,
                 "state": "ok"
               },
               {
                 "latitude": -10.3660886,
                 "longitude": 0.35369114,
                 "state": "ok"
               },
               {
                 "latitude": 55.69019407,
                 "longitude": -59.66886897,
                 "state": "ok"
               },
               {
                 "latitude": 3.9068005,
                 "longitude": 153.69131235,
                 "state": "ok"
               },
               {
                 "latitude": 51.89864781,
                 "longitude": -63.55310146,
                 "state": "ok"
               },
               {
                 "latitude": -14.62183332,
                 "longitude": 67.83526771,
                 "state": "ok"
               },
               {
                 "latitude": -34.39554502,
                 "longitude": -30.05096631,
                 "state": "ok"
               },
               {
                 "latitude": -33.97514932,
                 "longitude": 40.31209363,
                 "state": "ok"
               },
               {
                 "latitude": 54.51480881,
                 "longitude": 171.96751803,
                 "state": "ok"
               },
               {
                 "latitude": -55.90155466,
                 "longitude": 4.13508784,
                 "state": "ok"
               },
               {
                 "latitude": -11.8347531,
                 "longitude": 32.23309094,
                 "state": "ok"
               },
               {
                 "latitude": 16.96908895,
                 "longitude": -105.42482449,
                 "state": "ok"
               },
               {
                 "latitude": -28.42994119,
                 "longitude": 129.01768264,
                 "state": "ok"
               },
               {
                 "latitude": 75.32860893,
                 "longitude": -152.31458612,
                 "state": "ok"
               },
               {
                 "latitude": -32.56223281,
                 "longitude": 92.72680696,
                 "state": "ok"
               },
               {
                 "latitude": -43.66899581,
                 "longitude": 140.98379241,
                 "state": "ok"
               },
               {
                 "latitude": 8.61872302,
                 "longitude": 13.84693289,
                 "state": "ok"
               },
               {
                 "latitude": 0.14868217,
                 "longitude": 117.62023711,
                 "state": "ok"
               },
               {
                 "latitude": 51.47187941,
                 "longitude": -167.20943974,
                 "state": "ok"
               },
               {
                 "latitude": -22.27138106,
                 "longitude": -157.58328444,
                 "state": "ok"
               },
               {
                 "latitude": 2.40952715,
                 "longitude": -22.52399458,
                 "state": "ok"
               },
               {
                 "latitude": 10.84490311,
                 "longitude": 162.68112472,
                 "state": "ok"
               },
               {
                 "latitude": -46.41643864,
                 "longitude": -143.73178399,
                 "state": "ok"
               },
               {
                 "latitude": -54.0279287,
                 "longitude": -152.99242039,
                 "state": "ok"
               },
               {
                 "latitude": 1.0567708,
                 "longitude": 88.55723962,
                 "state": "ok"
               },
               {
                 "latitude": -20.66140411,
                 "longitude": -64.30665745,
                 "state": "ok"
               },
               {
                 "latitude": -17.10444467,
                 "longitude": 143.33975954,
                 "state": "ok"
               },
               {
                 "latitude": -61.10561128,
                 "longitude": -78.51239747,
                 "state": "ok"
               },
               {
                 "latitude": -55.37635476,
                 "longitude": -77.53207112,
                 "state": "ok"
               },
               {
                 "latitude": -23.66576874,
                 "longitude": -52.32670979,
                 "state": "ok"
               },
               {
                 "latitude": -6.47155815,
                 "longitude": 30.81142629,
                 "state": "ok"
               },
               {
                 "latitude": 42.90200564,
                 "longitude": -143.85404156,
                 "state": "ok"
               },
               {
                 "latitude": 24.92694279,
                 "longitude": -133.35828769,
                 "state": "ok"
               },
               {
                 "latitude": -49.97821349,
                 "longitude": -0.26612433,
                 "state": "ok"
               },
               {
                 "latitude": -23.99597071,
                 "longitude": -107.97138904,
                 "state": "ok"
               },
               {
                 "latitude": 15.24996022,
                 "longitude": -176.23772294,
                 "state": "ok"
               },
               {
                 "latitude": 65.74398673,
                 "longitude": 8.66316389,
                 "state": "ok"
               },
               {
                 "latitude": 54.20055699,
                 "longitude": -1.56717161,
                 "state": "ok"
               },
               {
                 "latitude": 36.48176036,
                 "longitude": 133.96131108,
                 "state": "ok"
               },
               {
                 "latitude": 10.33286973,
                 "longitude": -17.39192067,
                 "state": "ok"
               },
               {
                 "latitude": 31.75352424,
                 "longitude": 170.5402408,
                 "state": "ok"
               },
               {
                 "latitude": -5.52829019,
                 "longitude": -140.92286402,
                 "state": "ok"
               },
               {
                 "latitude": -28.19737205,
                 "longitude": -39.04746715,
                 "state": "ok"
               },
               {
                 "latitude": -38.21557618,
                 "longitude": -37.55445976,
                 "state": "ok"
               },
               {
                 "latitude": 68.10235218,
                 "longitude": 135.74498691,
                 "state": "ok"
               },
               {
                 "latitude": -58.12198859,
                 "longitude": -78.55544559,
                 "state": "ok"
               },
               {
                 "latitude": -31.26045453,
                 "longitude": -1.35950307,
                 "state": "ok"
               },
               {
                 "latitude": 53.98979451,
                 "longitude": -11.39956013,
                 "state": "ok"
               },
               {
                 "latitude": -60.74666126,
                 "longitude": 22.15699227,
                 "state": "ok"
               },
               {
                 "latitude": 16.95024135,
                 "longitude": 43.98152634,
                 "state": "ok"
               },
               {
                 "latitude": 32.07405539,
                 "longitude": -43.37512782,
                 "state": "ok"
               },
               {
                 "latitude": -1.3646573,
                 "longitude": 153.90147245,
                 "state": "ok"
               },
               {
                 "latitude": -22.92868397,
                 "longitude": 84.42005609,
                 "state": "ok"
               },
               {
                 "latitude": 40.13756498,
                 "longitude": 96.68696474,
                 "state": "ok"
               },
               {
                 "latitude": 62.34421501,
                 "longitude": -37.20244075,
                 "state": "ok"
               },
               {
                 "latitude": 65.85692031,
                 "longitude": 40.45000219,
                 "state": "ok"
               },
               {
                 "latitude": 24.77379811,
                 "longitude": 77.98957193,
                 "state": "ok"
               },
               {
                 "latitude": 61.18481803,
                 "longitude": -123.44762247,
                 "state": "ok"
               },
               {
                 "latitude": 32.80719924,
                 "longitude": 26.16649624,
                 "state": "ok"
               },
               {
                 "latitude": -73.10469628,
                 "longitude": 166.50973128,
                 "state": "ok"
               },
               {
                 "latitude": 18.53116024,
                 "longitude": 39.15714455,
                 "state": "ok"
               },
               {
                 "latitude": 57.38752103,
                 "longitude": -74.91548029,
                 "state": "ok"
               },
               {
                 "latitude": 3.32118234,
                 "longitude": -135.03985346,
                 "state": "ok"
               },
               {
                 "latitude": -68.75462807,
                 "longitude": 89.55391047,
                 "state": "ok"
               },
               {
                 "latitude": 51.12025229,
                 "longitude": -134.02812969,
                 "state": "ok"
               },
               {
                 "latitude": -68.22573634,
                 "longitude": 18.38418234,
                 "state": "ok"
               },
               {
                 "latitude": -22.6714199,
                 "longitude": 90.0645418,
                 "state": "ok"
               },
               {
                 "latitude": 51.14749761,
                 "longitude": -42.26659596,
                 "state": "ok"
               },
               {
                 "latitude": -11.65512581,
                 "longitude": 117.74766691,
                 "state": "ok"
               },
               {
                 "latitude": -55.64249236,
                 "longitude": 179.36612433,
                 "state": "ok"
               },
               {
                 "latitude": -52.13376913,
                 "longitude": -82.66574148,
                 "state": "ok"
               },
               {
                 "latitude": 36.30380959,
                 "longitude": -119.78244921,
                 "state": "ok"
               },
               {
                 "latitude": 19.05235917,
                 "longitude": 49.60320896,
                 "state": "ok"
               },
               {
                 "latitude": 9.31667421,
                 "longitude": 106.26890854,
                 "state": "ok"
               },
               {
                 "latitude": -26.47284875,
                 "longitude": -175.23358603,
                 "state": "ok"
               },
               {
                 "latitude": 25.59227944,
                 "longitude": -65.02836162,
                 "state": "ok"
               },
               {
                 "latitude": -29.4207131,
                 "longitude": -122.98211592,
                 "state": "ok"
               },
               {
                 "latitude": -12.86469877,
                 "longitude": 31.44554545,
                 "state": "ok"
               },
               {
                 "latitude": 43.12340234,
                 "longitude": -60.98640773,
                 "state": "ok"
               },
               {
                 "latitude": -5.85338235,
                 "longitude": 23.96810616,
                 "state": "ok"
               },
               {
                 "latitude": 32.57091166,
                 "longitude": 8.03186564,
                 "state": "ok"
               },
               {
                 "latitude": -31.08674587,
                 "longitude": 129.58186607,
                 "state": "ok"
               },
               {
                 "latitude": 18.20638916,
                 "longitude": -23.20152775,
                 "state": "ok"
               },
               {
                 "latitude": -0.25372685,
                 "longitude": 126.24279941,
                 "state": "ok"
               },
               {
                 "latitude": 5.13640988,
                 "longitude": 51.91922531,
                 "state": "ok"
               },
               {
                 "latitude": -55.93821724,
                 "longitude": 35.55199101,
                 "state": "ok"
               },
               {
                 "latitude": -29.45632376,
                 "longitude": -117.24815902,
                 "state": "ok"
               },
               {
                 "latitude": 62.80483448,
                 "longitude": 15.84004745,
                 "state": "ok"
               },
               {
                 "latitude": 0.79889615,
                 "longitude": -59.95641328,
                 "state": "ok"
               },
               {
                 "latitude": -6.58702146,
                 "longitude": 89.38584716,
                 "state": "ok"
               },
               {
                 "latitude": 65.24939511,
                 "longitude": -66.47666767,
                 "state": "ok"
               },
               {
                 "latitude": 71.85178048,
                 "longitude": -85.29022035,
                 "state": "ok"
               },
               {
                 "latitude": -73.94247248,
                 "longitude": 31.28213161,
                 "state": "ok"
               },
               {
                 "latitude": -23.76031667,
                 "longitude": 41.42274638,
                 "state": "ok"
               },
               {
                 "latitude": 7.31584445,
                 "longitude": 97.1336929,
                 "state": "ok"
               },
               {
                 "latitude": 33.38563737,
                 "longitude": 160.95287012,
                 "state": "ok"
               },
               {
                 "latitude": 44.8664645,
                 "longitude": 55.23122573,
                 "state": "ok"
               },
               {
                 "latitude": -2.21074805,
                 "longitude": -70.30591128,
                 "state": "ok"
               },
               {
                 "latitude": 57.25761208,
                 "longitude": -132.58614584,
                 "state": "ok"
               },
               {
                 "latitude": -32.20349621,
                 "longitude": 176.9990958,
                 "state": "ok"
               },
               {
                 "latitude": -47.57102357,
                 "longitude": 79.82850523,
                 "state": "ok"
               },
               {
                 "latitude": 50.03539176,
                 "longitude": -169.14245956,
                 "state": "ok"
               },
               {
                 "latitude": 32.01701564,
                 "longitude": 17.58431086,
                 "state": "ok"
               },
               {
                 "latitude": -54.70674746,
                 "longitude": -116.53329644,
                 "state": "ok"
               },
               {
                 "latitude": -28.55668204,
                 "longitude": 73.85819863,
                 "state": "ok"
               },
               {
                 "latitude": 59.11312346,
                 "longitude": 7.39204094,
                 "state": "ok"
               }
             ];