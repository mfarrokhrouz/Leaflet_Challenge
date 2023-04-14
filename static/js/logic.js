// create the URL for the geoJason
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// test URL
// 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

//production URL
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// create a map object
var myMap = L.map("mapid", {
    center: [39, -98.5795],
    zoom: 5
  });
  
  // Adding the base map 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


  // retrieve the data using  D3
d3.json(url).then(function(data){
    console.log(data)
    // Start for loop to add the new markers 
    for (var i = 0; i < data.features.length; i++){


        // retrive the coordinates for markers
        coords = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]
        
        //retrieve the color used for each marker
        var color = '';
        var depth = data.features[i].geometry.coordinates[2];
        switch(true){
            case (depth > -10 && depth < 10):
                color = 'rgb(19, 235, 45)'
                break;
            case (depth >= 10 && depth < 20):
                    color = 'rgb(100, 106, 100)'
                    break;
            case (depth >= 20 && depth < 30):
                color = 'rgb(138, 206, 190)'
                break;
            case (depth >= 30 && depth < 40):
                    color = 'rgb(140, 104, 20)'
                    break;
            case (depth >= 40 && depth < 50):
                color = 'rgb(186, 174, 0)'
                break;
            case (depth >= 50 && depth < 60):
                color = 'rgb(218, 136, 0)'
                break;
            case (depth >= 60 && depth < 70):
                color = 'rgb(190, 05, 200)'
                break;
            case ( depth >= 70 && depth < 90):
                color = 'rgb(237, 91, 0)'
                break;
            case (depth >= 90):
                color = 'rgb(242, 24, 31)'
                break;
        }

        // create the variables for your popup
        var date = moment(data.features[i].properties.time).format('MMMM Do YYYY')
        var time =  moment(data.features[i].properties.time).format('h:mm:ss a')
        var loc = data.features[i].properties.place
        var mag = data.features[i].properties.mag

        // Create the circles for each earthquake report and add to the baseMap layer.
        L.circle(coords, {
            opacity: .5,
            fillOpacity: 0.75,
            weight: .5,
            color: 'black',
            fillColor: color,
            radius: 10000 * data.features[i].properties.mag
    }).bindPopup(`<p align = "left"> <strong>Date:</strong> ${date} <br> <strong>Time:</strong>${time} <br>
     <strong>Location:</strong> ${loc} <br> <strong>Magnitude:</strong> ${mag} </p>`).addTo(myMap)

    newMarker = L.layer
}});

var legend = L.control({position: 'bottomright'});


legend.onAdd = function (){
    var div = L.DomUtil.create('div', 'info legend');
    var grades = ['-10-10', '10-20', '20-30', '30-40', '40-50','50-60','60-70','70-90', '90+'];
    var colors = [
        'rgb(19, 235, 45)',
        'rgb(100, 106, 100)',
        'rgb(138, 206, 190)',
        'rgb(140, 104, 20)',
        'rgb(186, 174, 0)',
        'rgb(218, 136, 0)',
        'rgb(190, 05, 200)',
        'rgb(237, 91, 0)',
        'rgb(242, 24, 31)'
        ];
    var labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    grades.forEach(function(grade, index){
        labels.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>");
    })
  
    div.innerHTML += "<ul>" + labels.join("") +"</ul>";
    return div;

};

legend.addTo(myMap);

// "<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 15px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>"








