import axios from 'axios'

class Api {
  constructor(apiToken) {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        API_TOKEN: apiToken
      }
    });
  }

  async list_dir(path) {
    const response = await this.client.get(`/files/list?path=${path}`)
    return response.data
  }
}

export default Api