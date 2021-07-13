let now = new Date();
let fullDate = document.querySelector("#Date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
fullDate.innerHTML = `${day} ${date} ${month} </br> ${hours}:${minutes} </br> ${year}`;

//👨‍🏫Your task
//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function displayCurrentWeather(response) {
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;
}

function searchCity(city) {
  let apiKey = "35e31b5022fa82dff3680a2316423322";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("h2");

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showCurrentWeather(response) {
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${response.data.name}`;
  h1.innerHTML = `${temperature}° C`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function handlePosition(position) {
  let apiKey = "35e31b5022fa82dff3680a2316423322";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#myCity");
button.addEventListener("click", getCurrentPosition);
