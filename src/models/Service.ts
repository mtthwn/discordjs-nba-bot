import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { NBA_API_URL } from '../config';
import { APIError } from './Error';

interface NbaApiResponse {
  status: number;
  data: AxiosResponse['data'];
}

export default class Service {

  service: AxiosInstance

  constructor() {
    const service = axios.create({
      baseURL: NBA_API_URL,
      timeout: 5000,
    });

    this.service = service;
  }

  async getPlayerInformation(firstName: string, lastName = ''): Promise<NbaApiResponse> {
    return await this.get(`/players?search=${firstName} ${lastName}`);
  }

  async getPlayerSeasonStats(season: number, playerId: number): Promise<NbaApiResponse> {
    return await this.get(`/season_averages?season=${season}&player_ids[]=${playerId}`);
  }

  async getPlayerGameStats(date: string, playerId: number): Promise<NbaApiResponse> {
    return await this.get(`/stats?player_ids[]=${playerId}&dates[]=${date}`);
  }

  private async get(path: string) {
    try {
      const response = await this.service.get(path);

      return {
        status: response.status,
        data: response.data,
      };

    }
    catch (e) {
      const errorCode = (e as AxiosError).code;

      if (errorCode === 'ECONNABORTED') {
        throw new APIError('Request timed out');
      }

      throw new APIError((e as Error).message);
    }
  }
}
