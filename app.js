var express = require("express");
var request = require("request");
var map = require("./controller/googleMap");
var busLocations = require('./controller/bus-locations.js');
var app = express();
var stop;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));


app.get("/", function(req,res){
   res.render("searchtfl") 
});

//tfl api looking for all bus stops 
app.get("/tfl", function(req,res){
    var query = req.query.search;
    console.log(query)
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints"
    console.log(url)
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body)
                    .map((item) => {
                        return {
                            name: item.commonName,
                            lat: item.lat,
                            lon: item.lon,
                            //href: <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4966.313758984106!2d-0.1065368!3d51.5103378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzM3LjMiTiAwwrAwNicxNS4zIlc!5e0!3m2!1sen!2sus!4v1472302684758" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                            //href: `https://www.google.com/maps?q=loc:${item.lat},${item.lon}`,
                            href: `/map?stop=${item.commonName}`
                        } 
                    })
                res.render("tfl", {data});
            }
       });
});
// all route on map
app.get("/route", function(req,res){
    var query = req.query.search;
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints"
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body)
                    .map((item) => {
                        return {
                            location: item.commonName+ ", London",
                           // stopover: true
                            
                        } 
                    })
                    console.log(data)
                res.render("mapRoute", {map, data});
            
            }
       });
    
    //console.log(map)
})
//bus stop on map
 app.get("/map", map.mapping);
 
// markers all route
app.get("/maps", function(req,res){
    var query = req.query.stop;
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints";
    var data;
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){

                //parse data through required function located in the js folder
                data = busLocations.getLocationsArray(JSON.parse(body));

                //take data array, and render it into the map view
                res.render("maps",{data: data});
         } else {
             res.render("error");
         }});

});

 
 


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie server started");
});