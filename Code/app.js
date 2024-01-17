var meteorIcon = L.icon({
    iconUrl: 'Icons/meteor.png',
//    shadowUrl: '',

    iconSize:     [38, 95], // size of the icon
 //   shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
 //   shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var foundIcon = L.icon({
    iconUrl: 'Icons/found.png',
//    shadowUrl: '',

    iconSize:     [38, 95], // size of the icon
 //   shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// placeholder function for data loading
// michael and brian, this needs your magic to bring in the real data
function loadDataForYear(year) {
    // debug line, can be ditched later
    console.log("load and display data for the year:", year);

    // todo: flesh out the data handling
    // the steps are:
    // 1. get the data, maybe from a json or csv?
    // 2. if 'year' is not 'all', filter the data to just that year
    // 3. wipe the old data off the map before adding new stuff
    // 4. plot the new data points on the map

    // note: 'all' means any year from 1983 to 2023
}

// this bit reacts to the dropdown changes
// it tells 'loadDataForYear' what to do next
function handleYearChange(event) {
    const selectedYear = event.target.value;
    loadDataForYear(selectedYear);
}

// setting up the map here
// we're starting with a basic look BUT COULD APPLY A WATERCOLOR OR TONER OVERLAY
function initMap() {
    // the map gets going with these settings
    var myMap = L.map("map", {
        center: [20, 0], // where the map first looks
        zoom: 2 // how close we're starting
    });

    // OPTION 1 using openstreetmap for our base layer (replace with layers here)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
}

// dropdown listener setup
function setupDropdown() {
    var selector = document.getElementById("yearSelect");
    selector.addEventListener("change", handleYearChange);
}

// the main kickoff function
// gets the map and dropdown ready, and loads initial data
function init() {
    initMap();
    setupDropdown();
    loadDataForYear('all'); // starting off with all the data
}

// when the page loads, we start here
window.onload = init;

// notes for michael and brian:
// in 'loadDataForYear', you need to add the actual data fetching and displaying logic
// feel free to tweak the map settings or add cool features
// the dropdown is all set (i think), it's just about what happens when the year option changes
// JUST SAYING, but we could make it really cool looking like here https://maps.stamen.com/#watercolor/12/37.7706/-122.3782
// and changing up the background and font styling with some borders. if we're bored.
