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
    this._height = this.validateHeight(height_feet, height_inches);
    this._fullName = `${first_name} ${last_name}`;
    this._position = this.validatePosition(position);
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

  validateHeight(heightFeet: number, heightInches: number): string {
    if (!heightFeet) {
      return 'No height data available';
    }

    return `${heightFeet} ft ${heightInches} in`;
  }

  validatePosition(position: string): string {
    if (position.length === 0) {
      return 'No position data available';
    }

    return position;
  }
}
