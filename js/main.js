const API_KEY = "GET_YOUR_API_YOURSELF"; 

$("#searchBtn").on("click", function() {
  const cityName = $("#cityInput").val().trim();
  if (cityName) {
    getWeather(cityName);
    getForecast(cityName);
  }
});

$("#saveCityBtn").on("click", function() {
  const cityName = $("#cityInput").val().trim();
  if (cityName) {
    const city = new City(cityName);
    city.saveFavorite();
    const toast = new bootstrap.Toast($("#savedToast"));
    toast.show();
  }
});

async function getWeather(cityName) {
  try {
    const response = await $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      method: "GET"
    });
    const weather = new Weather(response);
    weather.renderCurrent();
  } catch (err) {
    $("#errorModal").modal("show");
  }
}

async function getForecast(cityName) {
  try {
    const response = await $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
      method: "GET"
    });

    const dailyForecasts = [];
    for (let i = 0; i < response.list.length; i += 8) {
      dailyForecasts.push(response.list[i]);
    }

    $("#forecastWeather").html(""); // Clear

    dailyForecasts.forEach(day => {
      $("#forecastWeather").append(`
        <div class="col-md-2">
          <div class="card text-center">
            <div class="card-body">
              <h6>${new Date(day.dt_txt).toLocaleDateString()}</h6>
              <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="icon">
              <p>${day.main.temp}°C</p>
              <p class="text-muted">${day.weather[0].description}</p>
            </div>
          </div>
        </div>
      `);
    });

  } catch (err) {
    $("#errorModal").modal("show");
  }
}
