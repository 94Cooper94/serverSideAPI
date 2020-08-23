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

        $("#cityForm").empty();

        // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
        var card = $("<div>").push("card");
        var cardBody = $("<div>").push("card-body");
        var cityName = $("h2").push("card-title");
        var cityTemp = $("<p>").push("card-text").text("Temperature is " + data.main.temp + "F");
        var cityWind = $("<p>").push("card-text").text("Wind speed is " + data.wind.speed + "mph");
        var cityHumid = $("<p>").push("card-text").text("Humidity is " + data.main.humidity + "%");
        var weatherIcon = $("<img>").attr("src", "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png");


        // calling the above variables to appending to our card
        cityName.append(weatherIcon);
        cardBody.append(cityName, cityTemp, cityWind, cityHumid);
        card.append(cardBody);
        $("#cityForm").append(card);


  // specifically to append items to the search history div
  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $("#searchDiv").append(li);


  function cityForecast(city) {
    var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",


  function cityUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=ade2bb7e46d866c6271ae23428c893bc&lat=" + lat + "&lon=" + lon,
      dataType: "json",




//
//
//
//-----------------------------------------------------------
// separating the real code
// from da fake code
//-----------------------------------------------------------
//