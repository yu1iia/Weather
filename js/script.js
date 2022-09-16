'use strict';

// Weather block
const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
  weatherBlock.innerHTML = `
    <div class='weather__loading'>
    <img src='img/loading-bar.webp' alt='Loading...'>
    </div>`;

  const server =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Poznan&appid=92c069495110269d888e2b86e9dd6b47';
  const response = await fetch(server, {
    method: 'GET',
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  // Data processing and output
  console.log(data);
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  // HTML template

  const template = `
  <div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
          </div>
          <div class="weather__icon">
            <img src="http://openweathermap.org/img/w/04d.png" alt="${weatherIcon}" />
          </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
