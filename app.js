var express = require("express");
var request = require("request");
var app = express();
var data=[];
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"))


app.get("/map", function(req,res){
   res.render("map") 
});
app.get("/", function(req,res){
   res.render("searchtfl") 
});
function getStation(query){
    var url ="https://api.tfl.gov.uk/line/"+query+"/stoppoints"
    data = [];
    request(url, function(error,body){
        console.log(error)
        // if(!error && response.statusCode == 200){
            data = body;
            // console.log(data);
        // } 
    });
    return data;
}
//tfl api looking for all bus stops 
app.get("/tfl", function(req,res){
    var query = req.query.search;
    data = getStation(query);
    res.render("tfl", {data: data});
});
// looking for lng adress
console.log("before \\s",data)
data = getStation(73);
console.log(data.length);
app.get("/s", function(req,res){
    //var data = getStation("74"); 
    //console.log("before \\s",data.length)
    var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+data[0]["commonName"]+"London+UK&AIzaSyAy7pE9UvY-M1mENT3ER49LyOjztju6wIs";
        request(url, function(error,response,body){
            console.log(response.statusCode)
          if(!error && response.statusCode == 200){
              var data = JSON.parse(body);
              
              res.render("map", {data: data});
            } 
        });
    });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie server started");
});