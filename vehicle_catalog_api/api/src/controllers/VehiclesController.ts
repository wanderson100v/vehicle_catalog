import {Request, Response} from 'express';
import { Vehicle } from '../entities';
import { CustomResponse, ResponseHelper, ServerError } from '../helpers';
import { ClienteError, ResponseType } from '../helpers/ResponseHelper';
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

    protected async getCleanParamsToCreate(req: any):Promise<Vehicle|CustomResponse>{
        return this.getCleanParamsToEdit(req);
    }

    protected async getCleanParamsToEdit(req: any):Promise<Vehicle|CustomResponse>{
        if (!req.files) {
            const customResponse: CustomResponse = {
                type: ResponseType.Error,
                code: ClienteError.Unauthorized,
                message: "A imagem não foi informada "+ req.files
            }
            return customResponse;
        }

        const image = req.files.image;
        const path =  __dirname + "/../public/media/" + image.name;

        image.mv(path, (err:any) => {
            if (err) {
                const customResponse: CustomResponse = {
                    type: ResponseType.Error,
                    code: ClienteError.Unauthorized,
                    message: "Erro ao cadastrar imagem do veículo"
                }
                return customResponse
            }
        });

        let name =  req.body.name;
        let price = req.body.price;
        let modelId =  req.body.model_id;
        let vehicle: Vehicle={
            image_url: "media/" + image.name,
            price: price,
            name: name,
            model_id: modelId,
        }
        return vehicle;
    }

}
