module.exports = {
    getLocationsArray: function(data) {
        var arr = [];
            data.forEach(function(item){
                // for each item, store the name, longitude and latitude locations
                // then store all objects in an array
                arr.push({name: item["commonName"].replace(/\'/g, ""), lat: item["lat"], lng: item["lon"]})
            });
        return arr;
}
}

