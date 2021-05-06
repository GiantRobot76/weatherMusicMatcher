//Global Vairable Declarations
var outputArray = [];

//sample Array for use in formatting. Will delete on completion of project. Just leaving here to use as youTube API output example.

var sampleYouTubeOutput = [
  {
    url:
      "https://m.youtube.com/playlist?list=PLb2aZl2AJg_VpTIQennzYzQVrA_fgRg7-",
    thumbnail: "https://i.ytimg.com/vi/FEVc6Bw0P3g/default.jpg",
    title: "Best Classic Reggae Songs",
  },
];

// Grabs Playlist Using YouTube API NOTE: VERY LIMITED NUMBER OF USES ALLOWED PER DAY. USE SAVED DATA FOR TESTING
function getPlaylist(genre) {
  var requestUrl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
    genre +
    "&type=playlist&key=AIzaSyBMyU-YVS8pasPI3wKV6fiqI1TiPV4RS5g";

  console.log(requestUrl);

  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    var responses = response.items;

    //     // for (let i = 0; i < responses.length; i++) {
    var keyURL = response.items[0].id.playlistId;
    var listURL = "https://m.youtube.com/playlist?list=" + keyURL;
    var thumbURL = response.items[0].snippet.thumbnails.default.url;
    var listTitle = response.items[0].snippet.title;

    outputArray.push({ url: listURL, thumbnail: thumbURL, title: listTitle });
    //     // }
    console.log(outputArray);
  });
}

// Weather population
// Displays temperature
var temp = response.current.temp;
$("#temperature").text(temp.toFixed(2) + "°F");

// Displays wind speeds
var wind = response.current.wind_speed;
$("#wind").text(wind.toFixed(2) + "MPH");

// Displays humidity
var humidity = response.current.humidity;
$("#humidity").text(humidity + " %");

// Displaying date for that day
var date = $("#date");
var dateValue = moment().format("M/D/YYYY");
date.text(dateValue);

// Displays Icon for that day
iconToday = response.current.weather[0].icon;
var findIconToday = new Image(50, 50);
findIconToday.src = "http://openweathermap.org/img/wn/" + iconToday + "@2x.png";
$("#icon").html(findIconToday);
//===============================
function getWeather() {
  //placeholder city for testing. Need to Link to Input field.

  var currentCity = "denver";

  requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&units=imperial&appid=255055a794435e93d10c1986c06d9c9b";
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    if (response.cod == "404") {
      console.log("city not found");
      return;
    }
    console.log(response);

    //variables used here need to be defined based on html structure. Leaving comments below so can easily link when IDs establised
    // cityName.text(data.name);
    // var today = moment().format(" (MM/DD/YYYY)");
    // currDate.text(today);
    // localTemperature.text(data.main.temp);
    // localWind.text(data.wind.speed);
    // localHumidity.text(data.main.humidity);
    // cityLat = data.coord.lat;
    // cityLon = data.coord.lon;
  });
}
