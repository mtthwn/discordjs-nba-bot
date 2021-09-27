interface PlayerStats {
  pts: number;
  reb: number;
  stl: number;
  fg_pct: number;
  min: number;
  ast: number;
}

export default class {
  private _points: string;
  private _rebounds: string;
  private _min: string;
  private _steals: string;
  private _fgPercentage: string;
  private _assists: string;

  constructor({ pts, reb, stl, fg_pct, min, ast }: PlayerStats) {
    this._points = pts.toString();
    this._rebounds = reb.toString();
    this._min = min.toString();
    this._steals = stl.toString();
    this._fgPercentage = (fg_pct / 100).toLocaleString('en-US', { style: 'percent', maximumSignificantDigits: 4 });
    this._assists = ast.toString();
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
