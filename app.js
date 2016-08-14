var express = require("express");
var request = require("request");
// new busLocations function to generate array of name/lat/lng data
var busLocations = require('./js/bus-locations.js');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"))

app.get("/", function(req,res){
   res.render("searchtfl") 
});

//tfl api looking for all bus stops 
app.get("/map", function(req,res){
    var query = req.query.search;
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints";
    var data;
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){

                //parse data through required function located in the js folder
                data = busLocations.getLocationsArray(JSON.parse(body));

                //take data array, and render it into the map view
                res.render("map",{data: data});
         } else {
             res.render("error");
         }});

});

app.listen(3000, function(){
    console.log("server started");
});
