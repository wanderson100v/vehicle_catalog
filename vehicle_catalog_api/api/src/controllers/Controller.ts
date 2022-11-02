import {Request, Response} from 'express';
import { ClienteError, CustomResponse, ResponseHelper, ServerError, Success } from '../helpers';
import Repository from '../repositories/Repository';

export abstract class Controller<T> {

    protected repository: Repository<T>;

    constructor(repository: Repository<T>){
        this.repository = repository;
    }

    public async all(req: Request, res:Response){
        try{
            const users = await this.repository.all();
            ResponseHelper.dataList(res, users);
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro buscar dados');
        }
    }

    public async findById(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            const entity = await this.repository.findById(id);
            ResponseHelper.data(res, entity);
        }catch(e){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, "Ocorreu um erro ao buscar dados")
        }
    }

    public async search(req: Request, res:Response){
        try{
            let offset = parseInt(req.query.offset as string);
            let limit = parseInt(req.query.limit as string);
            let search = req.query.search as string;
            if((!offset && offset != 0) || !limit || (!search && search != '') ) throw new Error
            let vehicles = await this.repository.search(search, limit,offset);
            let count =  await this.repository.searchCount(search);
            ResponseHelper.data(res,{
                'items': vehicles,
                'total': count.total
            });

        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, "Ocorreu um erro ao buscar dados")
        }
    }
    
    public async create(req: Request, res:Response){
        try{
            const response = await this.getCleanParamsToCreate(req);
            const resposeSend = ResponseHelper.checkExistsAndSend(res,response)
            if(resposeSend) return;
            const entity =(response as T)
            await this.repository.create(entity);
            ResponseHelper.success(res, Success.Created, "Cadastrado com sucesso")
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'Tentativa de violação de campo único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao cadastrar');
        }
    }

    public async edit(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            const response = await this.getCleanParamsToEdit(req);
            const resposeSend = ResponseHelper.checkExistsAndSend(res,response)
            if(resposeSend) return;
            const entity =(response as T)
            await this.repository.edit(id,entity);
            ResponseHelper.success(res, Success.Created, "Editado com sucesso")
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'Tentativa de violação de campo único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao editar');
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            await this.repository.delete(id);
            ResponseHelper.success(res, Success.Created, "deletado com sucesso")
        }catch(e:any){
            console.log(e);
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao excluir');
        }
    }
    
    protected abstract getCleanParamsToCreate(req: Request):Promise<T | CustomResponse>;

    protected abstract getCleanParamsToEdit(req: Request):Promise<T | CustomResponse>;

}
