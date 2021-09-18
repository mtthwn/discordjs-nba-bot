import axios, { AxiosInstance } from 'axios';
export default class Service {

  service: AxiosInstance

  constructor() {
    const service = axios.create({
      baseURL: 'https://www.balldontlie.io/api/v1/',
      timeout: 5000,
    });

    this.service = service;
  }

  async getPlayerInformation(firstName: string, lastName = '') {
    return await this.get(`/players?search=${firstName} ${lastName}`);
  }

  async getPlayerSeasonStats(season: number, playerId: number) {
    return await this.get(`/season_averages?season=${season}&player_ids[]=${playerId}`);
  }

  private async get(path: string) {
    try {
      const response = await this.service.get(path);

      return {
        status: response.status,
        data: response.data,
      };

    }
    catch (e: unknown) {
      console.error(e);

      return {
        status: 'FAILED',
      };
    }

  }
}
