const weatherList = document.querySelector('.weather-list');
const checkWeatherBtn = document.querySelector('#city-btn-js');
const cityNameInput = document.querySelector('#city');

checkWeatherBtn.addEventListener('click', event => {
  event.preventDefault();
  const cityNameDisplay = document.querySelector("#city-input-js");
  const cityNameRequest = cityNameInput.value;
  cityNameDisplay.append("Checking the Weather in " + cityNameRequest);
  updateCity(cityNameRequest)
  dataCall();
});

function updateCity(city) {
  weatherData = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f2e53f539786e6ab3e9318da74a9bc35`;
};

function createListItem(text) {
  var li = document.createElement('li');
  li.textContent = text;
  return li;
};

function appendChildren(parent, children) {
  children.forEach(function (child){
    parent.appendChild(createListItem(child));
  });
};

function dataCall(data) {
  console.log("dataCall weatherData", weatherData)
  fetch(weatherData)
  .then(response => response.json())
  .then(data => {
    let locationItems = [data.name, data.main.temp, data.weather[0].description]
    appendChildren(weatherList, locationItems);
  });
};
