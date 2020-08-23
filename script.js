var APIKey = "ade2bb7e46d866c6271ae23428c893bc";

$(document).ready(function() {
  $("#citySearch").on("click", function() {
    var cityInput = $("#cityInput").val();
    $("#cityInput").val("");
    console.log(cityWeather(cityInput));
  });


  // function cachedHistory() {
  // }


  function cityWeather(city) {
    // API AND AJAX
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {

        $("#cityForm").empty();

        // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
        var cityName = $(".cityName").push("#cityDiv");
        var cityTemp = $(".cityTemp").push("#cityDiv").text("Temperature is " + data.main.temp + "F");
        var cityWind = $("#cityWind").push("#cityDiv").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $("#cityHum").push("#cityDiv").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $("<img>").attr("src", "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");
        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);

        cityForecast();
        cityUVIndex();
      }
    });
  }


  function cityForecast(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {}
    });
  }


  function cityUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=ade2bb7e46d866c6271ae23428c893bc&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function(data) {
        if (data.value <= 3) {
          btn.addClass("btn-success");
        } 
        else if (data.value <= 6) {
          btn.addClass("btn-warning");
        }
        else if (data.value <= 11) {
          btn.addClass("btn-danger");
        }
        else {
          btn.addClass("btn-info");
        }
      }
    });
  }
});