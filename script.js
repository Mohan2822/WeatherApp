const apiKey = "0063ff2141192912aa1d37291e9f85d1";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-Icon");

async function checkWeather(city) {
  if (city === "") {
    alert("❗ Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(url + city + `&appid=${apiKey}`);
    const data = await response.json();
    

    if (data.cod === "404") {
      alert("❌ City not found. Please check the spelling.");
      return;
    }

    // Show weather data
    console.log(data);
    document.getElementById("city").innerHTML = `${data.name},${data.sys.country} `;
    document.getElementById("tem").innerHTML = data.main.temp + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " Km/h";

    // Set icon
    const condition = data.weather[0].main;
    if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
    else if (condition === "Clear") weatherIcon.src = "images/clear.png";
    else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (condition === "Mist") weatherIcon.src = "images/mist.png";
    else if (condition === "Rain") weatherIcon.src = "images/rain.png";
    else if (condition === "Snow") weatherIcon.src = "images/snow.png";
    else weatherIcon.src = "";
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("⚠️ Network error. Please try again later.");
  }
}

// Search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  checkWeather(city);
});

// Default load on page open
checkWeather("chennai");
