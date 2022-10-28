
import { Model } from '../entities';
import Repository from './Repository';

const TABLE_NAME = 'models';

export class ModelsRepository extends Repository<Model>{
   
   constructor(connection:any){
      super(connection,TABLE_NAME);
   }
}