import AxiosProvider from '../AxiosProvider';

export class UserProvider extends AxiosProvider {
  
  constructor(contentType = 'application/json') {
    super('/users/', contentType);
  }

  login(data) {
    return this.post('/users/login/',data);
  }
  
} 
