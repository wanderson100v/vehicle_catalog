abstract class Repository<T> {

   private readonly connection: any
   private readonly tableName: String;
   
   constructor(connection: any, tableName:String){
      this.connection = connection;
      this.tableName = tableName;
   }

   public async all(): Promise<T[]>{
      let allElements = this.connection.select().from(this.tableName)
      return allElements;
   }

   public async create(entity: T): Promise<boolean>|never{
      let insert = this.connection(this.tableName).insert(entity);
      return insert;
   }

   public async edit(id:number, entity: T): Promise<boolean>|never{
      let updated = this.connection(this.tableName).where('id',id).update(entity)
      return updated;
   }

   public async delete(id:number): Promise<boolean>|never{
      let deleted = this.connection(this.tableName).where('id',id).del()
      return deleted;
   }
}

export default Repository