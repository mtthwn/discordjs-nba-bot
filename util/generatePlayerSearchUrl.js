const { PLAYER_SEARCH_URI } = require('../constants');

const generatePlayerSearchUrl = (firstName, lastName) => PLAYER_SEARCH_URI + `${firstName || ''} ${lastName || ''}`;

module.exports = generatePlayerSearchUrl;