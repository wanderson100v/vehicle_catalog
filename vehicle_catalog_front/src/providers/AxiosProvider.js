import axios from 'axios';

export default class AxiosProvider {
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL||'http://localhost:3000/',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }
  get(url, params) {
    return this.axios.get(url, { params });
  }
  post(url, data) {
    return this.axios.post(url, data);
  }
  put(url, data) {
    return this.axios.put(url, data);
  }
  delete(url, data) {
    return this.axios.delete(url, data);
  }
}