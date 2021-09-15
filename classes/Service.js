const axios = require('axios');

const logger = require('../util/logger');

class Service {
  constructor() {
    const service = axios.create();

    this.service = service;
  }

  async get(path) {
    try {
      const response = await axios.get(path);

      return {
        status: response.status,
        data: response.data,
      };

      // eslint-disable-next-line brace-style
    } catch (e) {
      logger.error(e.message);

      return {
        status: 'FAILED',
      };
    }

  }
}

module.exports = Service;