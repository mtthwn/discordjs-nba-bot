class PlayerSeasonStats {
  constructor({ season, games_played, pts, reb, stl, fg_pct, min, ast }) {
    this.season = season.toString();
    this.gamesPlayed = games_played.toString();
    this.points = pts.toString();
    this.rebounds = reb.toString();
    this.min = min.toString();
    this.steals = stl.toString();
    this.fgPercentage = (fg_pct * 100).toString().substring(0, 5) + '%';
    this.assists = ast.toString();
  }

  get getSeason() {
    return this.season;
  }

  get getGamesPlayed() {
    return this.gamesPlayed;
  }

  get getPoints() {
    return this.points;
  }

  get getRebounds() {
    return this.rebounds;
  }

  get getMinutes() {
    return this.min;
  }

  get getSteals() {
    return this.steals;
  }

  get getFgPercentage() {
    return this.fgPercentage;
  }

  get getAssists() {
    return this.assists;
  }
}

module.exports = PlayerSeasonStats;