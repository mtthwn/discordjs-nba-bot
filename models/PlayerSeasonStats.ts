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
  private _season: string;
  private _gamesPlayed: string;
  private _points: string;
  private _rebounds: string;
  private _min: string;
  private _steals: string;
  private _fgPercentage: string;
  private _assists: string;

  constructor({ season, games_played, pts, reb, stl, fg_pct, min, ast }: PlayerSeasonStatsRequirement) {
    this._season = season.toString();
    this._gamesPlayed = games_played.toString();
    this._points = pts.toString();
    this._rebounds = reb.toString();
    this._min = min.toString();
    this._steals = stl.toString();
    this._fgPercentage = fg_pct.toLocaleString('en-US', { style: 'percent', maximumSignificantDigits: 4 });
    this._assists = ast.toString();
  }

  get getSeason(): string {
    return this._season;
  }

  get getGamesPlayed(): string {
    return this._gamesPlayed;
  }

  get getPoints(): string {
    return this._points;
  }

  get getRebounds(): string {
    return this._rebounds;
  }

  get getMinutes(): string {
    return this._min;
  }

  get getSteals(): string {
    return this._steals;
  }

  get getFgPercentage(): string {
    return this._fgPercentage;
  }

  get getAssists(): string {
    return this._assists;
  }
}
