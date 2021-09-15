const generatePlayerStatsUrl = (season, playerId) => {
    return `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`;
}

module.exports = generatePlayerStatsUrl;