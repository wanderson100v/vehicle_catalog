import AxiosProvider from '../AxiosProvider';

export class BrandProvider extends AxiosProvider {
  
  constructor(contentType = 'application/json') {
    super('/vehicles/brands/', contentType);
  }

} 
