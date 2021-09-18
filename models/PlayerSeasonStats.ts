export interface PlayerSeasonStatsRequirement {
  season: number;
  games_played: number;
  pts: number;
  reb: number;
  stl: number;
  fg_pct: number;
  min: number;
  ast: number;
}

export default class PlayerSeasonStats {
  season: string;
  gamesPlayed: string;
  points: string;
  rebounds: string;
  min: string;
  steals: string;
  fgPercentage: string;
  assists: string;

  constructor({ season, games_played, pts, reb, stl, fg_pct, min, ast }: PlayerSeasonStatsRequirement) {
    this.season = season.toString();
    this.gamesPlayed = games_played.toString();
    this.points = pts.toString();
    this.rebounds = reb.toString();
    this.min = min.toString();
    this.steals = stl.toString();
    this.fgPercentage = fg_pct.toLocaleString('en-US', { style: 'percent' });
    this.assists = ast.toString();
  }

  get getSeason(): string {
    return this.season;
  }

  get getGamesPlayed(): string {
    return this.gamesPlayed;
  }

  get getPoints(): string {
    return this.points;
  }

  get getRebounds(): string {
    return this.rebounds;
  }

  get getMinutes(): string {
    return this.min;
  }

  get getSteals(): string {
    return this.steals;
  }

  get getFgPercentage(): string {
    return this.fgPercentage;
  }

  get getAssists(): string {
    return this.assists;
  }
}
