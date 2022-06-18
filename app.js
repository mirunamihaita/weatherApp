const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const query = "Bucharest"
    const apiKey = "af0b4b777e9c95f2d91f4032b419803b"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather is currently " + weatherDescription + ".</p>")
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
            res.write("<img src=" + imageURL + ">");
     
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000")
})