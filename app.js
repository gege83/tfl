var express = require("express");
var request = require("request");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"))


app.get("/map", function(req,res){
   res.render("map") 
});
app.get("/", function(req,res){
   res.render("searchtfl") 
});

//youtube api https://maps.googleapis.com/maps/api/geocode/json?address=[?????]&AIzaSyAy7pE9UvY-M1mENT3ER49LyOjztju6wIs
app.get("/tfl", function(req,res){
    var query = req.query.search;
 var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints"
    request(url, function(error,response,body){
      if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
          console.log(data);
          res.render("tfl", {data: data});
        } 
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie server started");
});