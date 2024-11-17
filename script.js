const apiKey = '0135c0a7a5199009d87f7fcf4cd208b9'; // Replace with your OpenWeather API key
const weatherInfo = document.getElementById('weatherInfo');
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherInfo.innerHTML = `
    <p><strong>City:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
  `;
}
