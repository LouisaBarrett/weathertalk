const weatherList = document.querySelector('.weather-list')
const submitBtn = document.querySelector('#city-btn-js')
const nameInput = document.querySelector('#city')
const cityNameDisplay = document.querySelector('#city-name-js')
const phraseHelper = document.querySelector('#phrase-helper-js')
const mainSection = document.querySelector('section')
const API_KEY = 'f2e53f539786e6ab3e9318da74a9bc35' // Replace this key with your own unique API key

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

const phraseGenerator = (data) => {
  if (data.main.temp >= "70") {
    return `Be sure to pack your sunscreen!`
  } else if (data.main.temp <= "30") {
    return `I bet you're craving a pumpkin spice latte right now!`
  } else {
    return `All you need is a light sweater!`
  }
}

const backgroundColorUpdate = (element, data) => {
  if (data.main.temp >= "70") {
    element.removeAttribute("class")
    element.classList.add("hot-temp-bg")
  } else if (data.main.temp <= "30") {
    element.removeAttribute("class")
    element.classList.add("cool-temp-bg")
  } else {
    element.removeAttribute("class")
    element.classList.add("mid-temp-bg")
  }
}

const fetchData = (city) => {
  const weatherData = updateCity(city)
  fetch(weatherData)
  .then(response => response.json())
  .then(data => {
    backgroundColorUpdate(mainSection, data)
    phraseHelper.innerHTML = phraseGenerator(data)
    cityNameDisplay.innerHTML = generateTitle(data)
    weatherList.innerHTML = generateHTML(data)
    nameInput.value = ''
  })
}
