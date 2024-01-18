<<<<<<< Updated upstream
// placeholder function for data loading
// michael and brian, this needs your magic to bring in the real data
function loadDataForYear(year) {
=======
// var meteorIcon = L.icon({
//     iconUrl: 'Icons/meteor.png',
// //    shadowUrl: '',
//     iconSize:     [38, 95], // size of the icon
//  //   shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//  //   shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// var foundIcon = L.icon({
//     iconUrl: 'Icons/found.png',
// //    shadowUrl: '',
//     iconSize:     [38, 95], // size of the icon
//  //   shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// //    shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// Store the API variables
let baseURL = "https://data.nasa.gov/api/views/gh4g-9sfh/rows.json?accessType=DOWNLOAD";
let fell = "&fall=Fell";
let fall = "&fall=Found";
let year = "&year=";


//Year to show markers
const yearsToShow = [1983, 1993, 2003, 2013, 2023];
const years1983to2023 = Array.from({ length: 2023 - 1983 + 1 }, (_, index) => 1983 + index);


//Declare markerLayerGroup
let markerLayerGroup;

// create map since it doesn't require any external data
var baseMap = initMap();

// Function to load data for specific year
function loadDataForYear(selectedYear) {
    // Fetch and filter data based on the selected year or range
    let dynamicURL = baseURL + fell + fall;

    if (selectedYear !== 'all') {
        // If selected year isn't 'all', then fetch data for that year
        dynamicURL += year + selectedYear;
    }

    console.log("Fetching data from:", dynamicURL);

    d3.json(dynamicURL).then(function(response) {
        console.log("Data fetched successfully:", response);

        let markers = [];
        let mapData = response.data;

        for (let i = 0; i < mapData.length; i++) {
            let location = mapData[i];
            let lat = location[15];
            let lon = location[16];
            if (lat && lon) {
                let marker = L.marker([parseFloat(lat), parseFloat(lon)]);
                markers.push(marker);
            }
        }

        // Clear markers
        if (markerLayerGroup) {
            markerLayerGroup.clearLayers();
        }

        markerLayerGroup = L.layerGroup(markers);
        markerLayerGroup.addTo(baseMap);

        console.log("Markers added to the map.");
    });
>>>>>>> Stashed changes
    // debug line, can be ditched later
    // console.log("load and display data for the year:", year);
    // todo: flesh out the data handling
    // the steps are:
    // 1. get the data, maybe from a json or csv?
    // 2. if 'year' is not 'all', filter the data to just that year
    // 3. wipe the old data off the map before adding new stuff
    // 4. plot the new data points on the map
    // note: 'all' means any year from 1983 to 2023
}

// setting up the map here
var myMap;

// we're starting with a basic look BUT COULD APPLY A WATERCOLOR OR TONER OVERLAY
function initMap() {
    // the map gets going with these settings but checks if map is already init
    if (!myMap) {
        myMap = L.map("map", {
        center: [20, 0], // where the map first looks
        zoom: 2 // how close we're starting
    });
    // OPTION 1 using openstreetmap for our base layer (replace with layers here)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    }

    return myMap;
}

// dropdown listener setup
function setupDropdown() {
    var selector = document.getElementById("yearSelect");
    selector.addEventListener("change", handleYearChange);
}

// this bit reacts to the dropdown changes
// it tells 'loadDataForYear' what to do next
function handleYearChange(event) {
    const selectedYear = event.target.value;
    loadDataForYear(selectedYear);

}

// // Get data with D3
// d3.json(url).then(function(response) {
//     console.log(response)
//     // Create markers for group
//     // .addLayer belong to layerGroup
//     // let markers = L.marker();
//     let markers=[];
//     let mapData=response.data;
//     // Loop through the data
//     // for (let i = 0; i < mapData.length; i++) {
//     for (let i = 0; i < 100; i++) {
//         // Set the data location to a variable
//         let location=mapData[i];
//         let lat = location[15];
//         let lon = location[16];
//         // console.log(location);
//         // Check location property
//         if ((lat) & (lon)) {
//             // Add marker to the group
//             // let lat=location[15];
//             // let lon=location[16];
//             // console.log(lat, lon);
//             let marker=L.marker([parseFloat(lat), parseFloat(lon)]);
//             // add marker (layer) to array
//             markers.push(marker);
//         }
//     }

//     //Clear existing markers
//     if (markerLayerGroup) {
//         markerLayerGroup.clearLayers();
//     }

//     markerLayerGroup=L.layerGroup(markers);
//     // Add markers to map
//     markerLayerGroup.addTo(baseMap);
// });

// //This Clears existing markers
// markerLayerGroup.clearLayers();





// the main kickoff function
// gets the map and dropdown ready, and loads initial data
function init() {
    initMap();
    setupDropdown();
    //Loop through years and load data for each
    for (const yearToShow of yearsToShow) {
        loadDataForYear(yearToShow);
    }
}
// when the page loads, we start here
window.onload = function() {
    init();
};

// notes for michael and brian:
// in 'loadDataForYear', you need to add the actual data fetching and displaying logic
// feel free to tweak the map settings or add cool features
// the dropdown is all set (i think), it's just about what happens when the year option changes
// JUST SAYING, but we could make it really cool looking like here https://maps.stamen.com/#watercolor/12/37.7706/-122.3782
// and changing up the background and font styling with some borders. if we're bored.
