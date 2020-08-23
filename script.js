// the perfect psuedo code
// 1. properly config the weatherdash API
// 2. create the html elements with AJAX
// 3. create a function that takes in user-input of desired city
// 4. have that function .html the content into a div/card
// 5. have that function .append to the end of searchhistory (but replace certain elements once history reaches 10)
// 6. create a function that looks at the city's 5-day forecast & populates the corresponding div
// 7. create another function that warns the user if UV index is dangerous
// 8. 
// 9. 


$(document).ready(function() {
  $("#citySearch").on("click", function() {
    var cityInput = $("#cityInput").val();
    $("#cityInput").val("");
    cityWeather(cityInput);
  });

  function cityWeather(city) {
      // API AND AJAX
      var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + APIKey;
      $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "json",
        success: function(data) {
          
          // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
          var card = $("<div>").push("card");
          var cardBody = $("<div>").push("card-body");
          var cityName = $("h2").push("card-title");
          var cityTemp = $("<p>").push("card-text").text("Temperature is " + data.main.temp + "F");
          var cityWind = $("<p>").push("card-text").text("Wind speed is " + data.wind.speed + "mph");
          var cityHumid = $("<p>").push("card-text").text("Humidity is " + data.main.humidity + "%");
          var weatherIcon = $("<img>").attr("src", "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");


  }
  function cityForecast(city) {
    var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
    })
  }

});



  
        if (searchHistory.indexOf(city) === -1) {
          searchHistory.push(city);
          window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          makeRow(city);
        }
      

        $("#cityForm").empty();



        

        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);


        cityForecast(city);
        cityUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }



      success: function(data) {
        $("#cityForecast").html("<h4 class=\"mt-3\">Week's Forecast:</h4>").append("<div class=\"row\">");
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var col = $("<div>").addClass("col-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");
            var title = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocalDateString());
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max  + " F");
            var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            col.append(card.append(body.append(title, img, p1, p2)));
            $("#cityForecast .row").append(col);
          }
        }
      }
    });
  }


  function cityUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=ade2bb7e46d866c6271ae23428c893bc&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        if (data.value < 3) {
          btn.addClass("btn-success");
        } 
        else if (data.value < 7) {
          btn.addClass("btn-warning");
        }
        else {
          btn.addClass("btn-danger");
        }
        $("today .card-body").append(uv.append(btn));
      }
    });
  }
  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  if (history.length > 0) {
    cityWeather(history[history.length-1]);
  }
  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }




//
//
//
//-----------------------------------------------------------
// separating the real code
// from da fake code
//-----------------------------------------------------------
//




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
    var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {
        if (searchHistory.indexOf(city) === -1) {
          searchHistory.push(city);
          window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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
        var weatherIcon = $("<img>").attr("src", "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");
        

        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);


        cityForecast(city);
        cityUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }


  function cityForecast(city) {
    // idk if i need a new API key to generate the 5-day forecast
    var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(data) {
        $("#cityForecast").html("<h4 class=\"mt-3\">Week's Forecast:</h4>").append("<div class=\"row\">");
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var col = $("<div>").addClass("col-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");
            var title = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocalDateString());
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max  + " F");
            var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            col.append(card.append(body.append(title, img, p1, p2)));
            $("#cityForecast .row").append(col);
          }
        }
      }
    });
  }


  function cityUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=ade2bb7e46d866c6271ae23428c893bc&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        if (data.value < 3) {
          btn.addClass("btn-success");
        } 
        else if (data.value < 7) {
          btn.addClass("btn-warning");
        }
        else {
          btn.addClass("btn-danger");
        }
        $("today .card-body").append(uv.append(btn));
      }
    });
  }
  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  if (history.length > 0) {
    cityWeather(history[history.length-1]);
  }
  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});