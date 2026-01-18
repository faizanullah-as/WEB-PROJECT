const API_KEY = "5ea94d9857794bdca9e152250261801";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Enter city name");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("city").innerText = data.location.name;
      document.getElementById("temp").innerText = data.current.temp_c + "°C";
      document.getElementById("condition").innerText = data.current.condition.text;
      document.getElementById("time").innerText = data.location.localtime;

      document.getElementById("humidity").innerText = data.current.humidity;
      document.getElementById("wind").innerText = data.current.wind_kph;
      document.getElementById("feels").innerText = data.current.feelslike_c;
      document.getElementById("vis").innerText = data.current.vis_km;
      document.getElementById("pressure").innerText = data.current.pressure_mb;
      document.getElementById("aqi").innerText = data.current.air_quality.pm2_5.toFixed(1);

      setIcon(data.current.condition.text, data.current.is_day);
      showForecast(data.forecast.forecastday);
    });
}

function setIcon(condition, isDay) {
  let icon = "☁️";
  condition = condition.toLowerCase();

  if (condition.includes("sun") || condition.includes("clear")) {
    icon = isDay ? "☀️" : "🌙";
  } else if (condition.includes("cloud")) {
    icon = "☁️";
  } else if (condition.includes("rain")) {
    icon = "🌧️";
  } else if (condition.includes("wind")) {
    icon = "🌬️";
  }

  document.getElementById("weatherIcon").innerText = icon;
}

function showForecast(days) {
  const forecast = document.getElementById("forecast");
  forecast.innerHTML = "";

  days.forEach(day => {
    forecast.innerHTML += `
      <div>
        <p>${day.date}</p>
        <img src="${day.day.condition.icon}">
        <p>${day.day.avgtemp_c}°C</p>
      </div>`;
  });
}

function clearData() {
  document.getElementById("cityInput").value = "";
  document.getElementById("forecast").innerHTML = "";
}