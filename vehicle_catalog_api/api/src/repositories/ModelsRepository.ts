
import { Model } from '../entities';
import Repository from './Repository';

const TABLE_NAME = 'models';

export class ModelsRepository extends Repository<Model>{
   
   constructor(connection:any){
      super(connection,TABLE_NAME);
   }

   public makeSearchWhereClause(partialQuery: any, searchString:string) {
      return partialQuery.where('name','like',"%"+searchString+"%");
   }

}