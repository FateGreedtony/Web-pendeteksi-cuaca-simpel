class City {
  constructor(name) {
    this.name = name;
  }

  saveFavorite() {
    localStorage.setItem("favoriteCity", this.name);
  }
}
