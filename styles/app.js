// for time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("h3");

today.innerHTML = `${day} ${hours}:${minutes}`;

// for city
function submit(event) {
  event.preventDefault();
  // let city = document.querySelector("#search");
  let heading = document.querySelector("h1");

  heading.innerHTML = `${search.value}`;
}
let form = document.querySelector("form");
form.addEventListener("submit", submit);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  // document.querySelector("#temperature").innerHTML = Math.round(
  //   response.data.main.temp
  // );

  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/hr`;

  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
} // for converting degrees
function convertFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null
let degrees = document.querySelector("#celsius-convert");
degrees.addEventListener("click", convertCelsius);
let degree = document.querySelector("#fahrenheit-convert");
degree.addEventListener("click", convertFarenheit);

let fahrenheitLink = document.querySelector("#fahrenheit-convert");
fahrenheitLink.addEventListener("click", convertFarenheit);

let celsiusLink = document.querySelector("#celsius-convert");
fahrenheitLink.addEventListener("click", convertCelsius);

// For Temperature
function searchForCity() {
  let apiKey = "ade2c941f456758f1ba37300092d4328";
  let city = document.querySelector("#search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  navigator.geolocation.getCurrentPosition(searchLocation);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchForCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchLocation);
