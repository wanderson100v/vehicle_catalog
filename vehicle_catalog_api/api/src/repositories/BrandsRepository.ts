
import { Brand } from '../entities';
import Repository from './Repository';

const TABLE_NAME = 'vehicles';

export class BrandsRepository extends Repository<Brand>{
   
   constructor(connection:any){
      super(connection,TABLE_NAME);
   }
}