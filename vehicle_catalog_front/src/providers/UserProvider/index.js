import AxiosProvider from '../AxiosProvider';

export class UserProvider extends AxiosProvider {
  
  constructor() {
    super();
  }

  login(data) {
    return this.post('/users/login/',data);
  }
  
} 
