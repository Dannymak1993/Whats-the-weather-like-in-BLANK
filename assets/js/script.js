const apiKey = "699aefdc8fe2897444a1652df3aba2af";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");
const futureWeather = document.getElementById("future-weather");
const historyList = document.getElementById("history-list");
let history = JSON.parse(localStorage.getItem("history-list")) || [];
console.log(history);

function renderCurrentWeather(data, city) {
    console.log(data)
    cityName.textContent = city||cityInput.value
    temp.textContent = `temp: ${data.list[0].main.temp}°F`
    windSpeed.textContent = `windspeed: ${data.list[0].wind.speed}mph`
    humidity.textContent = `humidity: ${data.list[0].main.humidity}%`
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
}

function render5day(data) {
    futureWeather.innerHTML = ''; // Clear any previous content from the futureWeather element.
    for (let i = 0; i < data.list.length; i += 8) { // Loop through every 8th item in the data.list array.
        const date = data.list[i].dt_txt.split(" ")[0]; // Extract the date from the dt_txt property of the current item.
        const temperature = data.list[i].main.temp; // Extract the temperature from the main.temp property of the current item.
        const windSpeed = data.list[i].wind.speed; // Extract the wind speed from the wind.speed property of the current item.
        const humidity = data.list[i].main.humidity; // Extract the humidity from the main.humidity property of the current item.
        const iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`; // Construct the URL for the weather icon using the icon code from the current item.

        // Construct an HTML card containing the date, temperature, wind speed, humidity, and weather icon for the current item.
        const card = `
      <div class="card col-2">
        <div class="card-title">
          <h3>${date}</h3>
        </div>
        <div class="card-body">
          <p>temp: ${temperature}°F</p>
          <p>windspeed: ${windSpeed} mph</p>
          <p>humidity: ${humidity}%</p>
          <img src="${iconUrl}" alt="Weather Icon">
        </div>
      </div>
    `;

        // Insert the HTML card into the futureWeather element.
        futureWeather.insertAdjacentHTML('beforeend', card);
    }
}


searchBtn.addEventListener("click", () => {
    const city = cityInput.value
    if (city) {
        weatherInfo.style.display = "block";
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
            .then(response => response.json())
            .then(currentData => {
                // console.log(currentData)
                renderCurrentWeather(currentData);
                render5day(currentData);

                const history = JSON.parse(localStorage.getItem("history-list")) || [];
                history.push(cityInput.value);
                localStorage.setItem("history-list", JSON.stringify(history));
                updateHistoryList();
            }
            )
    }
});

function updateHistoryList() {
    historyList.innerHTML = "";
    const uniqueCities = [...new Set(history)]; // Remove duplicates from history array
    console.log(uniqueCities);
    uniqueCities.map(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.classList.add("history-list-item"); // Add class to each li element for styling and event listener
        console.log(li);
        historyList.appendChild(li);
        li.addEventListener("click", () => { // Add event listener to each li element
            weatherInfo.style.display = "block";
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    renderCurrentWeather(data, city);
                    render5day(data);
                });
        });
    });
}

updateHistoryList();


