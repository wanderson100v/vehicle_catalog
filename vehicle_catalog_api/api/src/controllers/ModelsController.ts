import {Request, Response} from 'express';
import { Model } from '../entities';
import { ModelsRepository } from '../repositories';
import { Controller } from './Controller';

export class ModelsController extends Controller<Model>{

    constructor(connection: any){
        super(new ModelsRepository(connection))
    }

    public async all(req: Request, res:Response){
        try{
            let Models = await this.repository.all();
            res.json({
                type:'success',
                items: Models
            })
        }catch(e:any){
            console.log(e)
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro buscar Modelos'
            });
        }
    }

    public async create(req: Request, res:Response){
        try{
            let name =  req.body.name;
            let model: Model={
                name: name
            }
            await this.repository.create(model);
            res.json({
                type:'success',
                message: 'Modelo cadastrado com sucesso'
            })
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    type:'error',
                    message: 'O nome da Modelo deve ser único'
                });
                return;
            }
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao cadastrar o Modelo'
            });
        }
    }

    public async edit(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            let name =  req.body.name;
            let Model: Model={
                name: name
            }
            await this.repository.edit(id, Model);
            res.json({
                type:'success',
                message: 'Modelo editada com sucesso'
            })
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    type:'error',
                    message: 'O nome da Modelo deve ser único'
                });
                return;
            }
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao editar a Modelo'
            });
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            await this.repository.delete(id);
            res.json({
                type:'success',
                message: 'Modelo deleteda com sucesso'
            })
        }catch(e:any){
            console.log(e)
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao deletar a Modelo'
            });
        }
    }

}
