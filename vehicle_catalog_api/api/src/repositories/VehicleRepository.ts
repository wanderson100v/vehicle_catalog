
import { Vehicle } from '../entities';
import Repository from './Repository';

const TABLE_NAME = 'vehicles';

export class VehicleRepository extends Repository<Vehicle>{

   constructor(connection:any){
      super(connection,TABLE_NAME);
   }
   
   public async evidenceds(): Promise<Vehicle>{
      let evidencedsElements = this.connection
         .select('*')
         .from(this.tableName)
         .limit(10)
         .offset(0)
         .orderBy('price', 'asc')
         .orderBy('created_at', 'desc');
      return evidencedsElements;
   }

   public async search(searchString:string, limit:number, offset:number): Promise<Vehicle[]>{
      const partialQuery = this.connection.select('*').from(this.tableName)
      let allElements = 
         this.makeSearchWhereClause(partialQuery, searchString)
         .limit(limit)
         .offset(offset)
         .orderBy('price', 'asc');
      return allElements;
   }

   public makeSearchWhereClause(partialQuery: any, searchString:string) {
      return partialQuery.where('name','like',"%"+searchString+"%");
   }
   
   
}