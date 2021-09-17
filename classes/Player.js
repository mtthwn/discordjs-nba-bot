class Player {
  constructor({ height_feet, height_inches, first_name, last_name, position }) {
    this.height = height_feet ? `${height_feet} ft ${height_inches} in`
      : 'No height data available';
    this.fullName = `${first_name} ${last_name}`;
    this.position = position.length > 0 ? position : 'No position data available';
  }

  get getHeight() {
    return this.height;
  }

  get getFullName() {
    return this.fullName;
  }

  get getPosition() {
    return this.position;
  }
}

module.exports = Player;