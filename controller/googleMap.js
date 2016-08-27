var request = require("request");
var google = require("googlemaps");

 function mapping(req,res){
      var query = req.query.stop;
      var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+ query/*[array of busstop station]*/ +"London+UK&AIzaSyAy7pE9UvY-M1mENT3ER49LyOjztju6wIs";
        request(url, function(error,response,body){
            if(!error && response.statusCode == 200){
              var data = JSON.parse(body);
               res.render("map", {data});
            } 
        });
    }
    
// route map
 

     
 var map = { mapping}
module.exports = map;