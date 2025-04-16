function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  let temperature = response.data.temperature.current;
  let timestamp = response.data.time;
  let timezoneOffset = response.data.timezone;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(timestamp);
  temperatureElement.innerHTML = Math.round(temperature);

  iconElement.innerHTML = `
    <img 
      src="${response.data.condition.icon_url}" 
      class="weather-app-icon" 
      alt="${response.data.condition.description}" 
    />
  `;
}
function searchCity(city) {
  let apiKey = "aac9e97a9bad93ctb4f09o460b13b0c2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch(function (error) {
      alert("City not found. Please try again.");
    });
}
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">🌤️</div>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>16º</strong>
        </div>
        <div class="weather-forecast-temperature">9º</div>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();
