const weatherList = document.querySelector('.weather-list')
const submitBtn = document.querySelector('#city-btn-js')
const nameInput = document.querySelector('#city')
const cityNameDisplay = document.querySelector("#city-name-js")
const API_KEY = "f2e53f539786e6ab3e9318da74a9bc35"

submitBtn.addEventListener('click', event => {
  event.preventDefault()
  fetchData(nameInput.value)
})

const updateCity = (city) => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
}

const generateTitle = (data) => {
  return `Here's what the weather looks<br> like today in ${data.name}`
}

const generateHTML = (data) => {
  return `<li> Current Temperature: <strong>${Math.floor(data.main.temp)}</strong> </li>
          <li> Low Temperature: <strong>${Math.floor(data.main.temp_min)}</strong> </li>
          <li> High Temperature: <strong>${Math.floor(data.main.temp_max)}</strong> </li>
          <li> ${data.weather[0].description} </li>`
}

const fetchData = (cityName) => {
  const weatherData = updateCity(cityName)
  fetch(weatherData)
  .then(response => response.json())
  .then(data => {
    cityNameDisplay.innerHTML = generateTitle(data)
    weatherList.innerHTML = generateHTML(data)
    nameInput.value = ""
  })
}
