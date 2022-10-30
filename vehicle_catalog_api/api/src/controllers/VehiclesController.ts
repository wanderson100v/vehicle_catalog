import {Request, Response} from 'express';
import { Vehicle } from '../entities';
import { ResponseHelper, ServerError } from '../helpers';
import { VehicleRepository } from '../repositories';
import { Controller } from './Controller';

export class VehiclesController extends Controller<Vehicle>{

    constructor(connection: any){
        super(new VehicleRepository(connection))
    }


    public async evidenceds(req: Request, res:Response){
        try{
            let vehicles = await (this.repository as VehicleRepository).evidenceds();
            ResponseHelper.dataList(res,vehicles);
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, "Ocorreu um erro veículos em evidência")
        }
    }

    protected async getCleanParamsToCreate(req: Request):Promise<Vehicle>{
        return this.getCleanParamsToEdit(req);
    }

    protected async getCleanParamsToEdit(req: Request):Promise<Vehicle>{
        let name =  req.body.name;
        let price = req.body.price;
        let modelId =  req.body.model_id;
        let vehicle: Vehicle={
            image_url: 'https://via.placeholder.com/300x200',
            price: price,
            name: name,
            model_id: modelId
        }
        return vehicle;
    }

}
