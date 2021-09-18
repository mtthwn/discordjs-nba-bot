export default (season: number, playerId: number): string => {
  return `/season_averages?season=${season}&player_ids[]=${playerId}`;
};
