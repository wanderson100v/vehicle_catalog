
import { User } from '../entities';
import Repository from './Repository';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TABLE_NAME = 'users';

export class UsersRepository extends Repository<User>{
   
   constructor(connection:any){
      super(connection,TABLE_NAME);
   }

   public async all(): Promise<User[]>{
      let allElements = this.connection.select("id","name","email", "is_super_user").from(this.tableName)
      return allElements;
   }

   public makeSearchWhereClause(partialQuery: any, searchString:string) {
      return partialQuery.where('name','like',"%"+searchString+"%");
   }

   public async create(user: User): Promise<boolean>|never{
      user.password = await bcrypt.hash(user.password, 10)
      return super.create(user);
   }

   public async login(email: string, password: string): Promise<any>|never{
        const user = await  this.findByEmail(email);
        if(!user) return '';
        const compare = await bcrypt.compare(password, user.password)
        if(compare){
            const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET,{expiresIn:5000})
            return {
               token: token,
               user:{
                  id:user.id,
                  name:user.name,
               }
            }
        }
        return '';
  }

  public findByEmail(email:string): Promise<User>{
      return this.connection(TABLE_NAME).where('email', email).first();
  }
  
}