var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";

$(document).ready(function() {

  $("#citySearch").on("click", function() {
    event.preventDefault();

    var cityInput = $("#cityInput").val().trim();
    cityWeather(cityInput);
    $("#cityInput").val("");
  });


  function cityWeather(city) {

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
        var cityTemp = $(".cityTemp").html("#cityDiv").text("Temperature is " + data.main.temp + " F");
          // $(".cityTemp").text("Temperature (K) " + data.main.temp);
          // $(".tempF").text("Temperature (F) " + tempF.toFixed(0));
        var cityWind = $(".cityWind").html("#cityDiv").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $(".cityHum").html("#cityDiv").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $(".weatherIcon").attr("src", "http://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");        
        
        var cityDiv = $("#cityDiv").html("#cityDiv");
        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cityDiv.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityDiv").append(card);

        // cityForecast();
        // cityUVIndex();
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


  // function cityUVIndex(lat, lon) {
  //   $.ajax({
  //     type: "GET",
  //     url: "http://api.openweathermap.org/data/2.5/uvi" + APIKey + "&lat=" + lat + "&lon=" + lon,
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