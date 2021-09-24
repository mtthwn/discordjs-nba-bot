interface PlayerRequirement {
  height_feet: number;
  height_inches: number;
  first_name: string;
  last_name: string;
  position: string;
  id: number;
}

export default class Player {
  private _height: string;
  private _fullName: string;
  private _position: string;
  private _id: number;

  constructor({ height_feet, height_inches, first_name, last_name, position, id }: PlayerRequirement) {
    this._height = this.validateHeight(height_feet, height_inches);
    this._fullName = `${first_name} ${last_name}`;
    this._position = this.validatePosition(position);
    this._id = id;
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

  get getId(): number {
    return this._id;
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
