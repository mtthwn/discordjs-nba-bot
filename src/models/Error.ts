export class NbaStatsError extends Error {
  _name: string;
  _code: number;

  constructor(message: string, code: number) {
    super(message);
    this._name = this.constructor.name;
    this._code = code;
  }

  get getErrorName(): string {
    return this._name;
  }

  get getErrorCode(): number {
    return this._code;
  }
}

export class InvalidSeasonError extends NbaStatsError {
  constructor(message: string | null) {
    super(message || 'Please provide a valid season', 400);
  }
}

export class InvalidPlayerError extends NbaStatsError {
  constructor(fullName: string[] | undefined) {
    super(fullName ? `${fullName.join(' ')} is not a valid NBA player` : 'Invalid name provided', 400);
  }
}

export class NoPlayerDataFoundError extends NbaStatsError {
  constructor() {
    super('No player data found', 400);
  }
}

export class APIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidDateError extends Error {
  constructor() {
    super('Invalid date provided - please provide in YYYY-MM-DD format');
  }
}