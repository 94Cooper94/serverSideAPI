// variables for the APIKey to easily call in functions
// and localstorage of city search to call
var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
var cityHistory = JSON.parse(localStorage.getItem("city")) || []


// loads all the functions on the page upon startup
$(document).ready(function () {
  // click function
  $("#citySearch").on("click", function () {
    event.preventDefault();
    // fetches city input element and user-input value
    var cityInput = $("#cityInput").val().trim();

    // i will verify that cityHistory doesnt include city in it
    if (cityHistory.indexOf(cityInput) === -1 && cityHistory.length < 10) {
      cityHistory.push(cityInput)
      window.localStorage.setItem("city", JSON.stringify(cityHistory));
    }
    $("#cityInput").val("");

    cityWeather(cityInput)
    cityForecast(cityInput)
    console.log(cityInput)
    cachedCities()
  });
});

  
// function that searches for city, pulling empty html elements and giving value
function cityWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
  $.ajax({
    type: "GET",
    url: queryURL,
    dataType: "json",
    success: function (data) {

      $("#cityInput").empty();

      // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
      cityName = $(".cityName").html("#cityDiv").text(city);
      cityTemp = $(".cityTemp").html("#cityDiv").text("Temperature: " + ((data.main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
      cityWind = $(".cityWind").html("#cityDiv").text("Wind speed: " + data.wind.speed + "mph");
      cityHumid = $(".cityHum").html("#cityDiv").text("Humidity: " + data.main.humidity + "%");
      weatherIcon = $(".weatherIcon").html("#cityDiv").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
      cityUVIndex(data.coord.lat, data.coord.lon);
    }
  });
}


// pulls the stored city input value and prepends as button below search bar
function cachedCities() {
  for (var i = 0; i < cityHistory.length; i++) {
    var cityList = $("<button>")
    cityList.text(cityHistory[i])
    cityList.addClass("list-group-item p-3 cityBtns")
    $("#searchDiv").prepend(cityList)
  }
  $(".cityBtns").on("click", function () {
    var city = $(this).text();
    cityWeather(city)
    cityForecast(city);
  });
}



// appends 5 cards each containing weather data for the next 5 days
function cityForecast(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
  $.ajax({
    type: "GET",
    url: queryURL,
    dataType: "json",
    success: function (data) {
      console.log(data); //placeholding what will eventually be the 5-day forecast

      $("#cityForecast").empty();

      tempForecast = $(".tempForecast").html("#cityForecast").text("Temperature: " + ((data.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
      console.log(tempForecast)
    }
  });
}


// separate function that reads the latitude/longitude of the searched-for city
function cityUVIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}${APIKey}`,
    dataType: "json",
    success: function (data) {
      // object containing UV value
      var uv = data[0].value;
      var cityUV = $(".cityUV").text("UV Index: " + uv);

      // to avoid stacking separate individual buttons
      $(".cityUV").removeClass("btn-success");
      $(".cityUV").removeClass("btn-warning");
      $(".cityUV").removeClass("btn-danger");
      $(".cityUV").removeClass("btn-info");

      // if statement to assign button element to UVI depending on value
      if (uv <= 3) {
        cityUV.addClass("btn-success");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else if (uv <= 6) {
        cityUV.addClass("btn-info");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else if (uv <= 11) {
        cityUV.addClass("btn-warning");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else {
        cityUV.addClass("btn-danger");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
    }
  });
};