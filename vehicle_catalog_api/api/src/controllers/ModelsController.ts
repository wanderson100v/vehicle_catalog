import {Request} from 'express';
import { Model } from '../entities';
import { ModelsRepository } from '../repositories';
import { Controller } from './Controller';

export class ModelsController extends Controller<Model>{

    constructor(connection: any){
        super(new ModelsRepository(connection))
    }

    protected async getCleanParamsToCreate(req: Request):Promise<Model>{
        return this.getCleanParamsToEdit(req);
    }

    protected async getCleanParamsToEdit(req: Request):Promise<Model>{
        let name =  req.body.name;
        let brandId =  req.body.brand_id;
        let model: Model={
            name: name,
            brand_id: brandId
        }
        return model;
    }

}
