var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";

$(document).ready(function() {

  $("#citySearch").on("click", function() {
    event.preventDefault();

    var cityInput = $("#cityInput").val().trim();
    cityWeather(cityInput);
    $("#cityInput").val("");
  });


  function cityWeather(city) {

    // this is the API doc that would be able to pull the UVI, but i cannot get this link to work ):
    // var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=340e329562e29bd2ff2b681d0bf2d492" + city + ",us" + APIKey;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {
        console.log(data);
        $("#cityInput").empty();


        // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
        var cityName = $(".cityName").html("#cityDiv").text(city);
        var cityTemp = $(".cityTemp").html("#cityDiv").text("Temperature: " + ((data.main.temp -273.15) * 1.80 + 32).toFixed(2) + " F");
        var cityWind = $(".cityWind").html("#cityDiv").text("Wind speed: " + data.wind.speed + "mph");
        var cityHumid = $(".cityHum").html("#cityDiv").text("Humidity: " + data.main.humidity + "%");
        // var cityUV = $(".cityUV").html("#cityDiv").text("UV Index: " + data.)
        var weatherIcon = $(".weatherIcon").attr("src", "http://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");      
        
        // cityForecast();
        cityUVIndex();
      }
    });
  }


  // function cachedHistory() {
  // }


  // function cityForecast(city) {
  //   var queryURL = "http://api.openweathermap.org/data/2.5/forecast?appid=" + city + APIKey;
  //   $.ajax({
  //     type: "GET",
  //     url: queryURL,
  //     dataType: "json",
  //     success: function(data) {}
  //   });
  // }


  function cityUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/uvi" + APIKey + "&lat=" + lat + "&lon=" + lon,
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