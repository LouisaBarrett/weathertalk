const weatherList = document.querySelector('.weather-list');
const checkWeatherBtn = document.querySelector('#city-btn-js');
const cityNameInput = document.querySelector('#city');

checkWeatherBtn.addEventListener('click', event => {
  event.preventDefault();
  const cityNameDisplay = document.querySelector("#city-input-js");
  const cityNameRequest = cityNameInput.value;
  cityNameDisplay.innerHTML = "Let's check the weather in " + cityNameRequest;
  dataCall(cityNameRequest);
});

function updateCity(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f2e53f539786e6ab3e9318da74a9bc35`;
};

function dataCall(cityName) {
  const weatherData = updateCity(cityName)
  fetch(weatherData)
  .then(response => response.json())
  .then(data => {
    const string = `<li> ${data.name} </li>
                    <li> ${data.main.temp} </li>
                    <li> ${data.weather[0].description} </li>`;
    weatherList.innerHTML = string;
  });
};
