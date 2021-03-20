const weatherList = document.querySelector('.weather-list');
const checkWeatherBtn = document.querySelector('#city-btn-js');
const cityNameInput = document.querySelector('#city');

checkWeatherBtn.addEventListener('click', event => {
  event.preventDefault();
  getData(cityNameInput.value);
});

let updateCity = (city) => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f2e53f539786e6ab3e9318da74a9bc35`;
};

let getData = (cityName) => {
  const weatherData = updateCity(cityName)
  fetch(weatherData)
  .then(response => response.json())
  .then(data => {
    const cityNameDisplay = document.querySelector("#city-name-js");
    cityNameDisplay.innerHTML = "Here's what the weather looks<br> like today in " + data.name;
    const string = `<li> Current Temperature: <strong>${Math.floor(data.main.temp)}</strong> </li>
                    <li> Low Temperature: <strong>${Math.floor(data.main.temp_min)}</strong> </li>
                    <li> High Temperature: <strong>${Math.floor(data.main.temp_max)}</strong> </li>
                    <li> ${data.weather[0].description} </li>`;
    weatherList.innerHTML = string;
    cityNameInput.value = "";
  });
};
