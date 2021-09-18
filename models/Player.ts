interface PlayerRequirement {
  height_feet: number;
  height_inches: number;
  first_name: string;
  last_name: string;
  position: string;
}

export default class Player {
  height: string;
  fullName: string;
  position: string;

  constructor({ height_feet, height_inches, first_name, last_name, position }: PlayerRequirement) {
    this.height = height_feet ? `${height_feet} ft ${height_inches} in`
      : 'No height data available';
    this.fullName = `${first_name} ${last_name}`;
    this.position = position.length > 0 ? position : 'No position data available';
  }

  get getHeight(): string {
    return this.height;
  }

  get getFullName(): string {
    return this.fullName;
  }

  get getPosition(): string {
    return this.position;
  }
}
