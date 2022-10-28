
import { Vehicle } from '../entities';
import Repository from './Repository';

const TABLE_NAME = 'vehicles';

export class VehicleRepository extends Repository<Vehicle>{
   
   constructor(connection:any){
      super(connection,TABLE_NAME);
   }
}