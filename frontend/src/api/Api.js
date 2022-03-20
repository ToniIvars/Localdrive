import axios from 'axios'

class Api {
  constructor(apiToken) {
    this.apiToken = apiToken
    this.APIUrl = process.env.REACT_APP_API_URL
  }

  async list_dir(path) {
    const response = await axios.get(`${this.APIUrl}/files/list?path=${path}`, {
      headers: {
        Accept: 'application/json',
        API_TOKEN: this.apiToken
      }
    })

    return response.data
  }
}

export default Api