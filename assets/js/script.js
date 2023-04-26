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

function renderCurrentWeather(data) {
    console.log(data)
    cityName.textContent = cityInput.value
    temp.textContent = `temp: ${data.list[0].main.temp}°F`
    windSpeed.textContent = `windspeed: ${data.list[0].wind.speed}mph`
    humidity.textContent = `humidity: ${data.list[0].main.humidity}%`
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
}

// function render5day(data) {
//     futureWeather.textContent=''
//     for (i = 0; i < data.list.length; i = i + 8) {
//         console.log(data.list[i])
//         const html = `
//     <div class="card col-2">
//                     <div class="card-title">

//                         <h3>${data.list[i].dt_txt.split(" ")[0]}</h3>
//                     </div>
//                     <div class="card-body">
//                         <p id="temp"></p>
//                         <p id="wind-speed"></p>
//                         <p id="humidity"></p>
//                         <img id="icon"></img>
//                     </div>
//                 </div>`
//         futureWeather.insertAdjacentHTML("beforeend",html)
//     }

// }
function render5day(data) {
    futureWeather.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const date = data.list[i].dt_txt.split(" ")[0];
        const temperature = data.list[i].main.temp;
        const windSpeed = data.list[i].wind.speed;
        const humidity = data.list[i].main.humidity;
        const iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;

        const card = `
            <div class="card col-2">
                <div class="card-title">
                    <h3>${date}</h3>
                </div>
                <div class="card-body">
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                    <img src="${iconUrl}" alt="Weather Icon">
                </div>
            </div>
        `;

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
            })
    }
})
