// ok take a step back and collect your focus
// here are the steps: psuedo code style
// 1. take user input from cityInput, store to local
// 2. retrieve from local and append to a div/col below "Search for a City:"
// 3. take snippets from Bujumbura and repurpose the code to retrieve data from the weatherAPI and present it similarly to the 06-server-side...png
// 4. simultaneously repurpose the BandsInTownApp activity from class to help retrieve data and .html() it to the dash
// 5. do something with the 5-day forecast
$(document).ready(function() {
  $("#citySearch").on("click", function() {
    var cityInput = $("#cityInput").val();

    $("#cityInput").val("");

    cityWeather(cityInput);
  });


  $("#searchDiv").on("click", "li", function() {
    cityWeather($(this).text());
  });


  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $("#searchDiv").append(li);
  }


  function cityWeather(city) {
    // API AND AJAX
    var APIKey = "ade2bb7e46d866c6271ae23428c893bc";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
    }).then(function(city) {
        if (searchDiv.indexOf(city) === -1) {
          searchDiv.push(city);
          window.localStorage.setItem("searchDiv", JSON.stringify(searchDiv));

          makeRow(city);
        }
      
        $("#cityForm").empty();

        // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var cityName = $("h2").addClass("card-title").text(data.name + " (" + new DataCue().toLocalDateString() + ")");
        var cityTemp = $("<p>").addClass("card-text").text("Temperature is " + data.main.temp + "F");
        var cityWind = $("<p>").addClass("card-text").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $("<p>").addClass("card-text").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $("<img>").attr("src", "http://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");
        
        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);

        cityForecast(city);
        cityUVIndex(data.coord.lat, data.coord.lon);
      
      });
      
      // .empty() the div to the right of the search div
      // populate the div with the above variables via .append()

    });