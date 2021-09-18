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

  async get(path: string) {
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
