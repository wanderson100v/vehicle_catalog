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

   public async create(entity: T): Promise<boolean>{
      let insert = this.connection(this.tableName).insert(entity);
      return true;
   }

   public async edit(entity: T): Promise<boolean>{
      return true;
   }

   public async delete(entity: T): Promise<boolean>{
      return true;
   }
}

export default Repository