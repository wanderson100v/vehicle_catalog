import AxiosProvider from '../AxiosProvider';

export class ModelProvider extends AxiosProvider {
  
  constructor(contentType = 'application/json') {
    super('/vehicles/models/', contentType);
  }

} 
