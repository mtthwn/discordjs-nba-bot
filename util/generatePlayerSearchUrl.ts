import { PLAYER_SEARCH_URI } from '../constants';

export default (firstName: string, lastName: string): string => PLAYER_SEARCH_URI + `${firstName || ''} ${lastName || ''}`;
