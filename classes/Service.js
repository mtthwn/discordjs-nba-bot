const axios = require('axios');

class Service {
  constructor() {
    const service = axios.create();

    this.service = service;
  }

  async get(path) {
    const response = await axios.get(path);

    return {
      status: response.status,
      data: response.data,
    };
  }
}

module.exports = Service;