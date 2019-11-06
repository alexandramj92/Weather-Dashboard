$(document).ready(function(){

$("#button-search").on("click", function(event){
    event.preventDefault();
    console.log("search button clicked");
    var city = $("#city-input").val();
    console.log (city);
    displayWeatherConditions();

});

function displayWeatherConditions(){
    //Clear any existing data
    var currentWeather = $("#current-weather-input");
    var FiveDayCont = $("#five-day-cont");
    currentWeather.empty();
    FiveDayCont.empty();


    //Weather API for current weather
    var city = $("#city-input").val();
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=91256f86e823d0a21a1f0c51b958e622";
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log("wind speed is " + response.wind.speed);
        // Div that will hold information on current weather
        var currentWeather = $("#current-weather-input");
        var temperature = $("<div id='temperature'>");
        temperature.text("Temperature: " + response.main.temp + " °C");
        var humidity = $("<div id='humidity'>");
        humidity.text("Humidity: " + response.main.humidity + " %");
        var windSpeed = $("<div id='windSpeed'>");
        windSpeed.text("Wind Speed: "+ response.wind.speed + " meter/sec")

        currentWeather.append(temperature);
        currentWeather.append(humidity);
        currentWeather.append(windSpeed);
        
        console.log("Latitude is " + response.coord.lat);
        console.log("Longitude is" + response.coord.lon);
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        //UV API for current UV data for one location

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=91256f86e823d0a21a1f0c51b958e622&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(response){
                console.log("UV API Response: " + JSON.stringify(response.value));
                var currentWeather = $("#current-weather-input");
                var uvIndex = $("<div id='uvIndex'>");
                uvIndex.text("UV Index: " + JSON.stringify(response.value));
                currentWeather.append(uvIndex);
        });

        var fivedayURL ="http://api.openweathermap.org/data/2.5/forecast?appid=91256f86e823d0a21a1f0c51b958e622&lat=" + lat + "&lon=" + lon + "&units=metric";
        $.ajax({
            url:fivedayURL,
            method: "GET"
        }).then(function(response){
                console.log(response);
// Five Day Forecast

                for (var i = 0; i<response.list.length; i++){
                    var date = response.list[i].dt_txt;
                    var dt = new Date(date);

                    var time = dt.toLocaleTimeString();
                   
                    if (time === "3:00:00 PM" ){

                        var newDiv = $("<div>");
                        newDiv.attr("class", "col-md-2");
                        newDiv.attr("class", "day-cont");
        
                        var date = response.list[i].dt_txt;
                        var dt = new Date(date);
                        var dateTxt = dt.toLocaleDateString();
                        var time = dt.toLocaleTimeString();
                        console.log ("date");
                        console.log(dt);
                        console.log("time");
                        console.log(time);
        
                        var dateDiv = $("<div>");
                        dateDiv.text(dateTxt);
                        newDiv.append(dateDiv);
        
                        var icon = response.list[i].weather[0].icon;
                        var image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                        console.log(image);
                        var imageDiv = $("<img>");
                        imageDiv.attr("src", image);
                        newDiv.append(imageDiv);
                        
                        var temp = response.list[i].main.temp;
                        var tempDiv = $("<div>");
                        tempDiv.text("Temperature: " + temp + " °C");
                        newDiv.append(tempDiv);
        
                        var hum = response.list[i].main.humidity;
                        var humDiv = $("<div>");
                        humDiv.text("Humidity: " + hum +" %");
                        newDiv.append(humDiv);
        
                        var FiveDayCont = $("#five-day-cont");
                        FiveDayCont.append(newDiv);
        
                       
        

                    }
                    
                }
               
        });


    });

};


});

