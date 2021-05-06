//Global Vairable Declarations
var outputArray = [];
var cityButton = $("#city-button");
var inputCity = $("#city-input");
var cityName = $("#city-name");
var displayCity = $("#display-city-name");
var newIconDisplay = $("#new-icon-display");
var temp = $("#temperature");
var wind = $("#wind");
var humidity = $("#humidity");
var iconImg = $("#iconIMG");
var date = $("#date");

var currentCity;
var weatherURL;

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

//Retrieves and Displays Weather Data Based on Input City - IconRef will be Used to Choose Playlist
function getWeather() {
  $.ajax({
    url: weatherURL,
    method: "GET",
  }).then(function (response) {
    if (response.cod == "404") {
      console.log("city not found");
      return;
    }
    console.log(response);

    displayCity.text(response.name);

    temp.text(response.main.temp);
    wind.text(response.wind.speed);
    humidity.text(response.main.humidity);

    var iconRef = response.weather[0].icon;
    console.log(iconRef);
    newIconDisplay.attr(
      "src",
      "https://openweathermap.org/img/wn/" + iconRef + "@2x.png"
    );
  });
}

//random index selection function for genre arrays

function pick3(array) {
  var numElements = array.length;
  randNum = Math.floor(Math.random() * numElements);

  var item1 = array[randNum];
  array = array.splice(randNum, 1);

  randNum = Math.floor(Math.random() * numElements - 1);

  var item2 = array[randnum];
  array = array.splice(randNum, 1);

  var item3 = array[randnum];
  array = array.splice(randNum, 1);

  return item1, item2, item3;
}

//event listeners
cityButton.on("click", function (event) {
  event.preventDefault();
  currentCity = inputCity.val().replace(" ", "+").trim();

  //keep original format for 2 name cities for display
  var formatCity = currentCity.replace("+", " ");

  weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&units=imperial&appid=255055a794435e93d10c1986c06d9c9b";
  getWeather();
});
