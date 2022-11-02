import AxiosProvider from '../AxiosProvider';

export class VehicleProvider extends AxiosProvider {
  
  constructor(contentType = 'application/json') {
    super('/vehicles/', contentType);
  }

  getVechicles(search, offset,limit) {
    return this.get(`search?search=${search}&limit=${limit}&offset=${offset}`, {}, true);
  }
  getEvidencedsVechicles() {
    return this.get(`evidenceds`, {}, true);
  }
} 
