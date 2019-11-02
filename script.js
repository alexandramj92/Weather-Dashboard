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
    currentWeather.empty();

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

        var fivedayURL ="http://api.openweathermap.org/data/2.5/forecast?appid=91256f86e823d0a21a1f0c51b958e622&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url:fivedayURL,
            method: "GET"
        }).then(function(response){

            // for (var i = 0; i< response.list.length; i++){

                console.log(response);
                var day = $("#day-" + i.toString());


                var date = response.list[0].dt_txt;
                var dt = new Date(date);
                console.log(dt.toLocaleDateString());
                console.log("date is " + date);
            // }
          

        });


    });

};


});

