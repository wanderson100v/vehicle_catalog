import {Request, Response} from 'express';
import { Model } from '../entities';
import { ClienteError, ResponseHelper, ServerError, Success } from '../helpers';
import { ModelsRepository } from '../repositories';
import { Controller } from './Controller';

export class ModelsController extends Controller<Model>{

    constructor(connection: any){
        super(new ModelsRepository(connection))
    }

    public async all(req: Request, res:Response){
        try{
            let models = await this.repository.all();
            ResponseHelper.dataList(res,models);
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, "Ocorreu um erro ao buscar modelos de veículos")
        }
    }

    public async create(req: Request, res:Response){
        try{
            let name =  req.body.name;
            let model: Model={
                name: name
            }
            await this.repository.create(model);
            ResponseHelper.success(res, Success.Created, "Modelo de veículo cadastrado com sucesso")
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O nome do modelo de veículo deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao cadastrar modelo de veículo');
        }
    }

    public async edit(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            let name =  req.body.name;
            let model: Model={
                name: name
            }
            await this.repository.edit(id, model);
            ResponseHelper.success(res, Success.Created, "Modelo de veículo editado com sucesso")
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O nome do modelo de veículo deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao editar modelo de veículo');
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            await this.repository.delete(id);
            ResponseHelper.success(res, Success.Created, "Modelo de veículos deletado com sucesso")
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao excluir modelo de veículos');
        }
    }

}
