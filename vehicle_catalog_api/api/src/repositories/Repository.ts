abstract class Repository<T> {

   protected readonly connection: any
   protected readonly tableName: string;
   
   constructor(connection: any, tableName:string){
      this.connection = connection;
      this.tableName = tableName;
   }

   public async all(): Promise<T[]>{
      let allElements = this.connection.select().from(this.tableName)
      return allElements;
   }

   public async findById(id: number): Promise<T>|never{
      return this.connection.where('id',id).select().from(this.tableName).first()
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

   public async count(): Promise<any>|never{
      return this.connection(this.tableName).count('id as total').first();
   }

}

export default Repository