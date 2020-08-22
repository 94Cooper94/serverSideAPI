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



  function cityWeather(response) {

    // API AND AJAX
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
    }).then(function(city) {
        if (history.indexOf(city) === -1) {
          history.push(city);
          window.localStorage.setItem("history", JSON.stringify(history));

          makeRow(city);
        }
      
        $("#today").empty();

        // variables for the weather aspects
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var cityName = $("h2").addClass("card-title").text(data.name + " (" + new DataCue().toLocalDateString() + ")");
        var cityTemp = $("<p>").addClass("card-text").text("Temperature is " + data.main.temp + "F");
        var cityWind = $("<p>").addClass("card-text").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $("<p>").addClass("card-text").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $("<img>").attr("src", "http://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");
        
        // calling these variables and appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#today").append(card);
      });
      // create variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
      // .empty() the div to the right of the search div
      // populate the div with the above variables via .append()


  // event handler for user clicking the citySearch button
  $("#citySearch").on("click", function(event) {
    event.preventDefault();
    
    // stores the city string as inputCity
    var inputCity = $("#cityInput").val().trim();

    // Running the cityWeather function passing the city as the value
    cityWeather(inputCity);
  })};

});