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
var likeButtons = $(".likeButtons");
var like1 = $("#button1");
var like2 = $("#button2");
var like3 = $("#button3");
var savedBox = $("#saved-play-lists");
var saveTarget = $("#saved-list-target");

//playlist card locations
var pl1Title = $("#PL1-Title");
var thumb1 = $("#thumbnail1");
var link1 = $("#link1");

var pl2Title = $("#PL2-Title");
var thumb2 = $("#thumbnail2");
var link2 = $("#link2");

var pl3Title = $("#PL3-Title");
var thumb3 = $("#thumbnail3");
var link3 = $("#link3");

var iconRef;

var currentCity;
var weatherURL;

//Saved playlist for persistent storage
var savedPlaylists = JSON.parse(localStorage.getItem("savedPlay")) || [];
var currentPlayListNum;

// Display the current date
var currentDate = moment().format("dddd, MMMM Do YYYY");
date.text(currentDate).css("font-weight", "bold");

//sample Array for use in formatting. Will delete on completion of project. Just leaving here to use as youTube API output example.

var sampleYouTubeOutput = [
  {
    url:
      "https://m.youtube.com/playlist?list=PLb2aZl2AJg_VpTIQennzYzQVrA_fgRg7-",
    thumbnail: "https://i.ytimg.com/vi/FEVc6Bw0P3g/default.jpg",
    title: "Best Classic Reggae Songs",
  },
];

function renderSavedLists() {
  for (let i = 0; i < savedPlaylists.length; i++) {
    var newAnchor = $("<a>");

    newAnchor.attr("href", savedPlaylists[i].playlistURL);
    newAnchor.text(savedPlaylists[i].playlistTitle);
    saveTarget.append(newAnchor);
  }
}

// Grabs Playlist Using YouTube API NOTE: VERY LIMITED NUMBER OF USES ALLOWED PER DAY. USE SAVED DATA FOR TESTING
function getPlaylist(genre, keyValue) {
  var requestUrl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
    genre +
    "&type=playlist&key=AIzaSyAQ-HzAgFyzREnif3Z0QoiTiQ64-iqM-Dk";

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
    //     // }

    //populate appropriate column with API Results
    if (keyValue === 1) {
      pl1Title.text(listTitle);
      thumb1.attr("src", thumbURL);
      link1.attr("href", listURL);
    } else if (keyValue === 2) {
      pl2Title.text(listTitle);
      thumb2.attr("src", thumbURL);
      link2.attr("href", listURL);
    } else {
      pl3Title.text(listTitle);
      thumb3.attr("src", thumbURL);
      link3.attr("href", listURL);
    }
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

    displayCity.text(response.name);

    temp.text(response.main.temp + " °F");
    wind.text(response.wind.speed + "MPH");
    humidity.text(response.main.humidity) + "%";

    iconRef = response.weather[0].icon;

    newIconDisplay.attr(
      "src",
      "https://openweathermap.org/img/wn/" + iconRef + "@2x.png"
    );
    chooseGenres();
  });
}

//random index selection function for genre arrays

function pick3(inputarray) {
  var numElements = inputarray.length;
  randNum = Math.floor(Math.random() * numElements);

  var item1 = inputarray[randNum];
  array = inputarray.splice(randNum, 1);

  randNum = Math.floor(Math.random() * (numElements - 1));

  var item2 = inputarray[randNum];
  array = inputarray.splice(randNum, 1);

  randNum = Math.floor(Math.random() * (numElements - 2));

  var item3 = inputarray[randNum];
  array = inputarray.splice(randNum, 1);

  return [item1, item2, item3];
}

//randomly selects genres from list for each weather type
function chooseGenres() {
  //arrays store possible genres for each weather type

  var possibile;

  var genre01d = ["Summer", "Rap", "Modern Rock", "Reggae", "Ranchera", "EDM"];
  var genre01n = [
    "R&B",
    "Underground Hip Hop",
    "Minor Classical",
    "Outlaw Country",
    "Electro Swing",
    "Party Rock",
  ];
  var genre02d = [
    "Classical",
    "Pop Punk",
    "90s Hip Hop",
    "Country",
    "Classic Rock",
    "House",
  ];
  var genre02n = [
    "Jazz",
    "Ska",
    "Hair Metal",
    "Indie Folk",
    "Renaussance",
    "Crunk",
  ];
  var genre03d = [
    "Minor Key",
    "Acoustic Sad",
    "00s Emo",
    "Piano Blues",
    "Dark Ambient",
    "Trap",
  ];
  var genre03n = [
    "Grunge",
    "Piano Score",
    "Rockabilly",
    "Minimal",
    "Smooth Jazz",
    "Glam Rock",
  ];
  var genre04d = [
    "Southern Gothic",
    "Alternative Rock",
    "Bluegrass",
    "Indie Rock",
    "Mariachi",
    "Goth Metal",
  ];
  var genre04n = [
    "Trip-hop",
    "Southern Gothic",
    "New Wave",
    "Ambient House",
    "Post Rock",
    "Sludge Metal",
  ];
  var genre09d = [
    "Acid Rock",
    "Glitch",
    "Celtic Folk",
    "Punk",
    "Symphonic",
    "Ragtime Blues",
  ];
  var genre09n = [
    "Trance",
    "Djent",
    "Ambient Piano",
    "Viking Metal",
    "Motown",
    "Psychedelic",
  ];
  var genre10d = [
    "Math Rock",
    "Lofi",
    "Show Tunes",
    "Doom Metal",
    "Blues",
    "Chamber Music",
  ];
  var genre10n = [
    "Nu Metal",
    "Hardcore",
    "Opera",
    "Nintendocore",
    "Deep House",
    "Acid Jazz",
  ];
  var genre11d = [
    "Epic Classical",
    "Speed Metal",
    "Industrial",
    "Brostep",
    "Electro House",
    "British Invasion",
  ];
  var genre11n = [
    "Orchestral",
    "Metalcore",
    "Dubstep",
    "Techno",
    "Jazz Fusion",
    "Symphonic Black Metal",
  ];
  var genre13d = [
    "Holiday",
    "Disney",
    "Drum and Bass",
    "K-Pop",
    "New Wave",
    "West Coast Rap",
  ];
  var genre13n = [
    "Black Metal",
    "Minor Dubstep",
    "J-Pop",
    "Hard Rock",
    "Synthwave",
    "East Coast Rap",
  ];
  var genre50d = [
    "Deep House",
    "Dark Orchestral",
    "Horror",
    "Death Metal",
    "Polka",
    "Europop",
  ];
  var genre50n = [
    "Rap Rock",
    "Symphonic Metal",
    "Acid House",
    "Dream Funk",
    "Contemporary Country",
    "Synthpop",
  ];

  switch (iconRef) {
    case "01d":
      possible = genre01d;
      break;
    case "02d":
      possible = genre02d;
      break;
    case "03d":
      possible = genre03d;
      break;
    case "04d":
      possible = genre04d;
      break;
    case "09d":
      possible = genre09d;
      break;
    case "10d":
      possible = genre10d;
      break;
    case "11d":
      possible = genre11d;
      break;
    case "13d":
      possible = genre13d;
      break;
    case "50d":
      possible = genre50d;
      break;
    case "01n":
      possible = genre01n;
      break;
    case "02n":
      possible = genre02n;
      break;
    case "03n":
      possible = genre03n;
      break;
    case "04n":
      possible = genre04n;
      break;
    case "09n":
      possible = genre09n;
      break;
    case "10n":
      possible = genre10n;
      break;
    case "11n":
      possible = genre11n;
      break;
    case "13n":
      possible = genre13n;
      break;
    case "50n":
      possible = genre50n;
      break;
    default:
      possible = genre01d;
      break;
  }
  var finalGenres = pick3(possible);
  console.log(finalGenres);

  getPlaylist(finalGenres[0], 1);
  getPlaylist(finalGenres[1], 2);
  getPlaylist(finalGenres[2], 3);
}

//event listeners

//replace funciton console log with a populate liked playlist section
like1.on("click", function () {
  if (currentPlayListNum) {
    currentPlayListNum++;
  } else currentPlayListNum = 0;

  savedPlaylists.push({
    playlistURL: link1.attr("href"),
    playlistTitle: pl1Title.text(),
  });
  console.log("push1");
  console.log(currentPlayListNum);
  console.log(link1.attr("href"));
  console.log(pl1Title.text());
  localStorage.setItem("savedPlay", JSON.stringify(savedPlaylists));
});
like2.on("click", function () {
  if (currentPlayListNum) {
    currentPlayListNum++;
  } else currentPlayListNum = 0;

  savedPlaylists.push({
    playlistURL: link2.attr("href"),
    playlistTitle: pl2Title.text(),
  });
  console.log(currentPlayListNum);
  console.log(link2.attr("href"));
  console.log(pl2Title.text());
  localStorage.setItem("savedPlay", JSON.stringify(savedPlaylists));
  console.log("push2");
});
like3.on("click", function () {
  if (currentPlayListNum) {
    currentPlayListNum++;
  } else currentPlayListNum = 0;

  savedPlaylists.push({
    playlistURL: link3.attr("href"),
    playlistTitle: pl3Title.text(),
  });
  console.log(currentPlayListNum);
  console.log(link3.attr("href"));
  console.log(pl3Title.text());
  console.log("push3");
  localStorage.setItem("savedPlay", JSON.stringify(savedPlaylists));
});

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

renderSavedLists();
