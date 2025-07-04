class Weather {
  constructor(data) {
    this.city = data.name;
    this.temp = data.main.temp;
    this.desc = data.weather[0].description;
    this.icon = data.weather[0].icon;
  }

  renderCurrent() {
    $("#currentWeather").html(`
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${this.city}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${this.desc}</h6>
          <img src="https://openweathermap.org/img/w/${this.icon}.png" alt="Weather icon">
          <p class="card-text">${this.temp}°C</p>
        </div>
      </div>
    `);
  }
}
