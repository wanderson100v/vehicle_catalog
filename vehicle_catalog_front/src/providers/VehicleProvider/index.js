import AxiosProvider from '../AxiosProvider';

export class VehicleProvider extends AxiosProvider {
  
  constructor() {
    super();
  }

  getVechicles(search, offset,limit) {
    return this.get(`/vehicles/search?search=${search}&limit=${limit}&offset=${offset}`, {});
  }
  getEvidencedsVechicles() {
    return this.get(`/vehicles/evidenceds`);
  }
} 
