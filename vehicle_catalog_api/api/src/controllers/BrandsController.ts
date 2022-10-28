import {Request, Response} from 'express';
import { Brand } from '../entities';
import { BrandsRepository } from '../repositories';
import { Controller } from './Controller';

export class BrandsController extends Controller<Brand>{

    constructor(connection: any){
        super(new BrandsRepository(connection))
    }

    public async all(req: Request, res:Response){
        try{
            let brands = await this.repository.all();
            res.json({
                type:'success',
                items: brands
            })
        }catch(e:any){
            console.log(e)
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro buscar marcas'
            });
        }
    }

    public async create(req: Request, res:Response){
        try{
            let name =  req.body.name;
            let brand: Brand={
                name: name
            }
            await this.repository.create(brand);
            res.json({
                type:'success',
                message: 'Marca cadastrada com sucesso'
            })
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    type:'error',
                    message: 'O nome da marca deve ser único'
                });
                return;
            }
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao cadastrar a marca'
            });
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
            res.json({
                type:'success',
                message: 'Marca editada com sucesso'
            })
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    type:'error',
                    message: 'O nome da marca deve ser único'
                });
                return;
            }
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao editar a marca'
            });
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            await this.repository.delete(id);
            res.json({
                type:'success',
                message: 'Marca deleteda com sucesso'
            })
        }catch(e:any){
            console.log(e)
            res.status(500).json({
                type:'error',
                message: 'Ocorreu um erro ao deletar a marca'
            });
        }
    }

}
