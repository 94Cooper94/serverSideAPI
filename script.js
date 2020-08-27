var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";

$(document).ready(function () {
  $("#citySearch").on("click", function () {
    event.preventDefault();
    var cityInput = $("#cityInput").val().trim();
    window.localStorage.setItem("city", cityInput);
    $("#cityInput").val("");
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
          // var cityUV = $(".cityUV").html("#cityDiv").text("UV Index: " + data.)
          weatherIcon = $(".weatherIcon").html("#cityDiv").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
          // console.log(data.coord.lat, data.coord.lon);
          cityUVIndex(data.coord.lat, data.coord.lon);    
        }
      })
    }
    cityWeather(cityInput);
  });


  function cachedCities() {
    var cityList = $("<button>");
    cityList.text(window.localStorage.getItem("city"));
    cityList.addClass("list-group-item p-3 cityBtns");
    $("#searchDiv").prepend(cityList);
  }
  cachedCities();


//   function cityForecast(city) {
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
//     $.ajax({
//       type: "GET",
//       url: queryURL,
//       dataType: "json",
//       success: function (data) {
//         console.log(data);
//       }
//     });  
//     console.log(city);
//     cityForecast(city);
//   }
});
 

function cityUVIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}${APIKey}`,
    dataType: "json",
    success: function (data) {
      var uv = data[0].value;
      var cityUV = $(".cityUV").text("UV Index: " + uv);

      if (uv <= 3) {
        cityUV.addClass("btn-success");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else if (uv <= 6) {
        cityUV.addClass("btn-warning");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else if (uv <= 11) {
        cityUV.addClass("btn-danger");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
      else {
        cityUV.addClass("btn-info");
        $("#cityDiv").append(cityUV.append(cityUV));
      }
    }
  });
};