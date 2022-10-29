import {Request, Response} from 'express';
import { Brand } from '../entities';
import { ClienteError, ResponseHelper, ServerError, Success } from '../helpers';
import { BrandsRepository } from '../repositories';
import { Controller } from './Controller';

export class BrandsController extends Controller<Brand>{

    constructor(connection: any){
        super(new BrandsRepository(connection))
    }

    public async all(req: Request, res:Response){
        try{
            let brands = await this.repository.all();
            ResponseHelper.dataList(res,brands);
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, "Ocorreu um erro ao buscar marcas de veículos")
        }
    }

    public async create(req: Request, res:Response){
        try{
            let name =  req.body.name;
            let brand: Brand={
                name: name
            }
            await this.repository.create(brand);
            ResponseHelper.success(res, Success.Created, "Marca de veículos cadastrada com sucesso")
        }catch(e:any){
            console.log(e);
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O nome da marca de veículos deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao cadastrar marca de veículos');
        }
    }

    public async edit(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            let name =  req.body.name;
            let brand: Brand={
                name: name
            }
            await this.repository.edit(id, brand);
            ResponseHelper.success(res, Success.Created, "Marca de veículos editada com sucesso")
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O nome da marca deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao editar marca de veículos');
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            await this.repository.delete(id);
            ResponseHelper.success(res, Success.Created, "Marca de veículos deletada com sucesso")
        }catch(e:any){
            console.log(e);
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao excluir marca de veículos');
        }
    }

}
