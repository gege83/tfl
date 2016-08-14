var express = require("express");
var request = require("request");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"))

app.get("/", function(req,res){
   res.render("searchtfl") 
});

//tfl api looking for all bus stops 
app.get("/tfl", function(req,res){
    var query = req.query.search;
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints"
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                    res.render("tfl", {data: data});
         } 
    });
});
// looking for lng adress
app.get("/map", function(req,res){
    var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+"Annesley Avenue"+"London+UK&AIzaSyAy7pE9UvY-M1mENT3ER49LyOjztju6wIs";
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
              var data = JSON.parse(body);
                res.render("map", {data: data});
            } 
        });
    });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie server started");
});