import axios from 'axios';

export default class AxiosProvider {
  constructor(prefix='', contentType) {
    this.prefix = prefix;
    this.baseUrl = import.meta.env.VITE_API_URL||'http://localhost:3000/';
    const login_data = JSON.parse(localStorage.getItem('login_data'));
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': contentType,
        'Accept': 'application/json',
        'x-acess-token': (login_data)? login_data.token: ''
      },
    });
  }

  _usePrefix(url, usePrefix){
    if(url=='') return this.prefix;
    return (usePrefix)? (this.prefix + url) : url;
  }

  get(url, params={}, usePrefix=false) {
    url = this._usePrefix(url, usePrefix);
    return this.axios.get(url, { params });
  }
  post(url, data, usePrefix=false) {
    return this.axios.post(this._usePrefix(url, usePrefix), data);
  }
  
  put(url, data, usePrefix=false) {
    return this.axios.put(this._usePrefix(url, usePrefix), data);
  }
  
  delete(url, data={}, usePrefix=false) {
    url = this._usePrefix(url, usePrefix)
    return this.axios.delete(url, data);
  }

  getAll(){
    return this.get('',{},true);
  }

  getFromId(id){
    return this.get('one/'+id, {}, true);
  }

  deleteFromId(id){
    return this.delete(id, {}, true);
  }

  editFromId(id, data){
    return this.put(id, data, true);
  }

  persist(data, id=null){
    if(!id){
      return this.post('', data, true);
    }
    return this.put(id, data, true);
  }
}