class Api {
  constructor(apiToken) {
    this.apiToken = apiToken
    this.APIUrl = process.env.REACT_APP_API_URL
  }

  async list_dir() {
    const response = await fetch(`${this.APIUrl}/files/list`, {headers: {
      Accept: 'application/json',
      API_TOKEN: this.apiToken
    }})

    return response.json()
  }
}

export default Api