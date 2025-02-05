// script.js

const API_KEY = '7cf0a29fac78d2621aa61a5bceda75fe';

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');

  // Add event listener to the search button
  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    } else {
      alert('Please enter a city name!');
    }
  });
});

async function fetchWeatherData(city) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const content = document.getElementById('content');

  content.innerHTML = `<p>Loading data for ${city}...</p>`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    content.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
  }
}

function displayWeatherData(data) {
  const { name, main, weather } = data;
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="card">
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Weather:</strong> ${weather[0].description}</p>
    </div>
  `;
}
