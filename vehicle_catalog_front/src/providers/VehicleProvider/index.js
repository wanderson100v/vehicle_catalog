import AxiosProvider from '../AxiosProvider';

export class VehicleProvider extends AxiosProvider {
  /*
    * esse exemplo utiliza como base a api do github
    * VITE_API_URL = https://api.github.com/
  */
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
