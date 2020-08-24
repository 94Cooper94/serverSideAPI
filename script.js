var APIKey = "ade2bb7e46d866c6271ae23428c893bc";

$(document).ready(function() {
  $("#citySearch").on("click", function() {
    var cityInput = $("#cityInput").val();
    // stringify?
    $("#cityInput").val("");
    console.log(cityWeather(cityInput));
  });


  // function cachedHistory() {
  // }


  function cityWeather(city) {
    // API AND AJAX
    var city = $("#cityInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {

        $("#cityForm").empty();


        // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
        var cityName = $(".cityName").html("#cityDiv");
        var cityTemp = $(".cityTemp").html("#cityDiv").text("Temperature is " + data.main.temp + "F");
        var cityWind = $("#cityWind").html("#cityDiv").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $("#cityHum").html("#cityDiv").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $("<img>").attr("src", "http://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");
        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);

        console.log(cityName);
        console.log(cityHumid);
        console.log(cityWind);
        console.log(cityTemp);
        // cityForecast();
        // cityUVIndex();
      }
    });
  }


  // function cityForecast(city) {
  //   var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
  //   $.ajax({
  //     type: "GET",
  //     url: queryURL,
  //     dataType: "json",
  //     success: function(data) {}
  //   });
  // }


  // function cityUVIndex(lat, lon) {
  //   $.ajax({
  //     type: "GET",
  //     url: "http://api.openweathermap.org/data/2.5/uvi?appid=ade2bb7e46d866c6271ae23428c893bc&lat=" + lat + "&lon=" + lon,
  //     dataType: "json",
  //     success: function(data) {
  //       if (data.value <= 3) {
  //         btn.addClass("btn-success");
  //       } 
  //       else if (data.value <= 6) {
  //         btn.addClass("btn-warning");
  //       }
  //       else if (data.value <= 11) {
  //         btn.addClass("btn-danger");
  //       }
  //       else {
  //         btn.addClass("btn-info");
  //       }
      // }
    // });
  // }
});