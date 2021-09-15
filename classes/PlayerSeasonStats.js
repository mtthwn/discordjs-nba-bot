class PlayerSeasonStats {
  constructor({ season, games_played, pts, reb, stl, fg_pct, min }) {
    this.season = season;
    this.gamesPlayed = games_played.toString();
    this.points = pts.toString();
    this.rebounds = reb.toString();
    this.min = min.toString();
    this.steals = stl.toString();
    this.fgPercentage = (fg_pct * 100).toString().substring(0, 5) + '%';
  }
}

module.exports = PlayerSeasonStats;