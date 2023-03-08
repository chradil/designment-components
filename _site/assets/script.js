let myMap = L.map('mapid');
myMap.setView([39.952583, -75.165222], 12);

let tiles = L.tileLayer(  "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg" // stamen toner tiles
);



tiles.addTo(myMap);

let data = trees;  
// let legend = L.control({position: 'bottomright'});
  
// legend.addTo(myMap);
  
  let treeSites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:1,
        color: getColor(feature)
      });
    },
    onEachFeature: addPopUp
    
  });
  
  treeSites.addTo(myMap);
  

function addPopUp(feature,layer){
  layer.bindPopup(feature.properties["Common Name"])
  
}

function getColor(feature){
  switch (feature.properties["Common Name"]) {
            case 'Red Maple':
              return  'orange';
            case 'Norway Maple':
              return 'green';
            case 'Sugar Maple':
              return 'blue';
            case 'Northern Red Oak':
              return 'purple';
            case 'Callery Pear':
              return 'pink';
            case 'Eastern White Pine':
              return 'red';
            case 'Honeylocust':
              return 'brown';
            case 'Pin Oak':
              return 'lightblue';
            case 'Ginkgo':
              return 'lavender';
            case 'London Planetree':
              return 'yellow';
            default:
              return 'black';
          }
        }
