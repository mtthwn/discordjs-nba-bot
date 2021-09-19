interface PlayerRequirement {
  height_feet: number;
  height_inches: number;
  first_name: string;
  last_name: string;
  position: string;
}

export default class Player {
  private _height: string;
  private _fullName: string;
  private _position: string;

  constructor({ height_feet, height_inches, first_name, last_name, position }: PlayerRequirement) {
    this._height = height_feet ? `${height_feet} ft ${height_inches} in`
      : 'No height data available';
    this._fullName = `${first_name} ${last_name}`;
    this._position = position.length > 0 ? position : 'No position data available';
  }

  get getHeight(): string {
    return this._height;
  }

  get getFullName(): string {
    return this._fullName;
  }

  get getPosition(): string {
    return this._position;
  }
}
