import PlayerStats from './PlayerStats';

interface PlayerGameStats {
  pts: number;
  reb: number;
  stl: number;
  fg_pct: number;
  min: number;
  ast: number;
  date: string;
}

export default class extends PlayerStats {
  private _date: string;

  constructor({ pts, reb, stl, fg_pct, min, ast, date }: PlayerGameStats) {
    super({ pts, reb, stl, fg_pct, min, ast });

    this._date = date;
  }

  get getDate(): string {
    return this._date;
  }
}