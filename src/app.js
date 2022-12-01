function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fr", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-evenly">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
 
  
    <div class="col-2 forecast">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <div class="forecast-image">
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      </div>
      <div class="weather-forecast-temp">
        <span class="forecast-max-temp">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f86609e405cc74813bc6bd5906b03dac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayAppContent(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity-content");
  let windElement = document.querySelector("#wind-content");
  let dateElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like-temp");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + " m/s";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°";

  getForecast(response.data.coord);
  backgroundChange(response.data.weather[0].icon);
}

function search(city) {
  let apiKey = "f86609e405cc74813bc6bd5906b03dac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayAppContent);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#city-search-bar");
form.addEventListener("submit", handleSubmit);

search("Stockholm");
