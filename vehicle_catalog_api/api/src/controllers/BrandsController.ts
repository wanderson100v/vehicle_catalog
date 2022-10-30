import {Request} from 'express';
import { Brand } from '../entities';
import { BrandsRepository } from '../repositories';
import { Controller } from './Controller';

export class BrandsController extends Controller<Brand>{

    constructor(connection: any){
        super(new BrandsRepository(connection))
    }

    protected async getCleanParamsToCreate(req: Request):Promise<Brand>{
        return this.getCleanParamsToEdit(req);
    }

    protected async getCleanParamsToEdit(req: Request):Promise<Brand>{
        let name =  req.body.name;
        let brand: Brand={
            name: name
        }
        return brand;
    }

}
