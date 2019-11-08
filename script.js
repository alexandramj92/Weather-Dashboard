$(document).ready(function(){

var pastSearchesList = [];
init();
displayPastSearches();

var city = "";


$("#button-search").on("click", function(event){
    event.preventDefault();
    console.log("search button clicked");
    city = $("#city-input").val();
    console.log (city);
    displayWeatherConditions();

    //Pushing city to empty array and saving city name in local storage
    if (pastSearchesList.length<6 && city.length > 2 ){
        pastSearchesList.push(city);
    }

    localStorage.setItem("pastSearchesList", JSON.stringify(pastSearchesList));
    $("#past-search-list").empty();
    displayPastSearches();
});

$(".past-search-item").on("click", function(event){
    event.preventDefault();
    console.log("past search item clicked!");
    city = $(this).text();
  
    console.log("past city");
    console.log(city);
    displayWeatherConditions();


});




function displayPastSearches(){
    // div that will hold past searches
    var ul = $("#past-search-list");


    for (var i=0; i<pastSearchesList.length; i++){
        var pastSearch = pastSearchesList[i];
        var li = $("<li>");
        li.text(pastSearch);
        li.attr("data-index", i);
        li.attr("class", "past-search-item");
        ul.append(li);
    }
    
}


function init(){
    var storedPastSearches = JSON.parse(localStorage.getItem("pastSearchesList"));
    if (storedPastSearches !== null){
        pastSearchesList = storedPastSearches;
    }
}



function displayWeatherConditions(){
    //Clear any existing data
    var currentWeather = $("#current-weather-input");
    var FiveDayCont = $("#five-day-cont");
    currentWeather.empty();
    FiveDayCont.empty();


    //Weather API for current weather
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=91256f86e823d0a21a1f0c51b958e622";
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log("wind speed is " + response.wind.speed);
        // Div that will hold information on current weather
        var currentWeather = $("#current-weather-input");

        var date = new Date();
        var dateTxt = date.toLocaleDateString();

        var cityName = $("<h3 id='city-name'>");
        cityName.text(response.name + " (" + dateTxt + ")");

        var iconCur = response.weather[0].icon;
        var imageCur = "http://openweathermap.org/img/wn/" + iconCur + "@2x.png";

        console.log("Icon Curr");
        console.log(iconCur);

        var imageCurDiv = $("<img>");
        imageCurDiv.attr("src", imageCur);
        

        var temperature = $("<div id='temperature'>");
        temperature.attr("style", "margin-bottom: 10px;");
        temperature.text("Temperature: " + Math.round(response.main.temp) + " °C");

        var humidity = $("<div id='humidity'>");
        humidity.attr("style", "margin-bottom: 10px;");

        humidity.text("Humidity: " + response.main.humidity + " %");

        var windSpeed = $("<div id='windSpeed'>");
        windSpeed.attr("style", "margin-bottom: 10px;");
        windSpeed.text("Wind Speed: "+ response.wind.speed + " meter/sec")

        currentWeather.append(cityName);
        currentWeather.append(imageCurDiv);
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
                console.log(response);
                console.log("UV API Response: " + JSON.stringify(response.value));
                var currentWeather = $("#current-weather-input");
                var uvIndex = $("<div id='uvIndex'>");
                var uvTitle = $("<p>");
                var uvValTxt = $("<p>");
                var uvVal = response.value;
                uvTitle.text("UV Index: ");
                uvValTxt.text(uvVal);
                uvIndex.append(uvTitle);
                uvIndex.append(uvValTxt);
                currentWeather.append(uvIndex);

                // changes the uv index field based on its value to indicate if a uv index is dangerous or not

                if (uvVal >= 0 && uvVal < 3){
                    uvValTxt.attr("style", "background-color: #71cd31; border-radius: 1em; width: 50px; text-align: center; margin-left: 5px;");
                } else if (uvVal > 3 && uvVal < 6){
                uvValTxt.attr("style", "background-color: #feec2a; border-radius: 1em; width: 50px; text-align: center; margin-left: 5px;");
                } else if (uvVal > 6  && uvVal < 8){
                uvValTxt.attr("style", "background-color: #ff8a3d; border-radius: 1em; width: 50px; text-align: center; margin-left: 5px;");
                } else if (uvVal > 8){
                uvValTxt.attr("style", "background-color: #fe4e58; border-radius: 1em; width: 50px; text-align: center; margin-left: 5px;");
                } else {
                    uvValTxt.attr("style", "background-color: white; border-radius: 1em; width: 50px; text-align: center; margin-left: 5px;");
                }


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
                        dateDiv.attr("class", "date-five-style");
                        newDiv.append(dateDiv);
        
                        var icon = response.list[i].weather[0].icon;
                        var image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                        console.log(image);
                        var imageDiv = $("<img>");
                        imageDiv.attr("src", image);
                        newDiv.append(imageDiv);
                        
                        var temp = response.list[i].main.temp;
                        var tempDiv = $("<div>");
                        tempDiv.text("Temperature: " + Math.round(temp) + " °C");
                        tempDiv.attr("style", "margin-bottom: 8px;");
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

