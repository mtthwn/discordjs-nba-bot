class Player {
  constructor({ height_feet, height_inches, first_name, last_name, position = 'No position data available' }) {
    this.height = height_feet ? `${height_feet} ft ${height_inches} in`
      : 'No height data available';
    this.fullName = `${first_name} ${last_name}`;
    this.position = position;
  }
}

module.exports = Player;