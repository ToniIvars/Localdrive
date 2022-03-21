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

  async listDir(path) {
    const response = await this.client.get(`/files/list?path=${path}`)
    return response.data
  }

  async download(path, name) {
    const response = await this.client.get(`/files/download/${name}?path=${path}`, {responseType: 'blob'})
    return response.data
  }
}

export default Api