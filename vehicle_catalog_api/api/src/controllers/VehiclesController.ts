import {Request, Response} from 'express';
import { Vehicle } from '../entities';
import { VehicleRepository } from '../repositories';
import { Controller } from './Controller';

export class VehiclesController extends Controller<Vehicle>{

    constructor(connection: any){
        super(new VehicleRepository(connection))
    }

    public async all(req: Request, res:Response){
        try{
            let veicles = await this.repository.all();
            res.json(veicles); 
        }catch(e:any){
            console.log(e)
            res.status(500.).send();
        }
       
    }

    public create(req: Request, res:Response){
        
        let vechicle: Vehicle={
            image_url:'url teste',
            name: 'nome teste',
            brand_id: 1,
            model_id: 1
        }

        this.repository.create(vechicle)
    }

    public edit(req: Request, res:Response){}

    public delete(req: Request, res:Response){}

}
