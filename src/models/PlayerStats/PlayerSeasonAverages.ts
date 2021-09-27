import PlayerStats from './PlayerStats';

export interface PlayerSeasonAverages {
  pts: number;
  reb: number;
  stl: number;
  fg_pct: number;
  min: number;
  ast: number;
  season: number;
  games_played: number;
}

export default class extends PlayerStats {
  private _season: string;
  private _gamesPlayed: string;

  constructor({ season, games_played, pts, reb, stl, fg_pct, min, ast }: PlayerSeasonAverages) {
    const formattedFgPercentage = fg_pct * 100;

    super({ pts, reb, stl, fg_pct: formattedFgPercentage, min, ast });

    this._season = season.toString();
    this._gamesPlayed = games_played.toString();
  }

  get getSeason(): string {
    return this._season;
  }

  get getGamesPlayed(): string {
    return this._gamesPlayed;
  }
}