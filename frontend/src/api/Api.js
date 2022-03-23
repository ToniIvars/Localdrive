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

  async mkdir(path, name) {
    return this.client.post('/files/mk-dir', {
        path: path,
        name: name
      })
      .then(response => response.data)
      .catch(error => {throw error.response.data})
  }

  async uploadFile(path, file) {
    const formData = new FormData();

		formData.append('post_file', file);

    return this.client.post(`/files/upload?path=${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => response.data)
      .catch(error => {throw error.response.data})
  }
}

export default Api