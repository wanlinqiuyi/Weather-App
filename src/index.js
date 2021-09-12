let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateNow = document.querySelector("#spanDate");
dateNow.innerHTML = `${day} ${hour}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#degres").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png">`;
  document.querySelector("#cloud").innerHTML = response.data.clouds.all;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherType").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city").value;
  let apiKey = "cabbb9d89e6cadbafe067f3557e92dbc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search");
form.addEventListener("submit", search);

function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let unit = "metric";
  let apiKey = "cabbb9d89e6cadbafe067f3557e92dbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentPosition);

function cTof(event) {
  event.preventDefault();
  function convert(response) {
    document.querySelector("#degres").innerHTML = Math.round(
      (response.data.main.temp * 9) / 5 + 32
    );
  }
}
let fahrenheitDegree = document.querySelector("#fahrenheit");
fahrenheitDegree.addEventListener("click", cTof);

function cToc(event) {
  event.preventDefault();
  function convert(response) {
    document.querySelector("#degres").innerHTML = Math.round(
      response.data.main.temp
    );
  }
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", cToc);
