import {Request, Response} from 'express';
import { User } from '../entities';
import { ClienteError, CustomResponse, ResponseHelper, ServerError, Success } from '../helpers';
import { ResponseType } from '../helpers/ResponseHelper';
import { UsersRepository } from '../repositories';
import { Controller } from './Controller';

export class UsersController extends Controller<User>{

    constructor(connection: any){
        super(new UsersRepository(connection))
    }

    public async login(req:Request, res:Response){
        const email = req.body.email;
        const password = req.body.password
        try{
            const token = await (this.repository as UsersRepository).login(email, password);
            if(!token) {
                ResponseHelper.clienteError(res, ClienteError.Unauthorized, 'E-mail ou senha invalidos');
                return;
            }
            ResponseHelper.data(res,{
                auth:true,
                token: token
            })
        }catch(error: any){
            console.log(error)
            ResponseHelper.serverError(res, ServerError.InternalServerError, (email+" - "+password));
        }
    }

    public async delete(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);
            const currentUserId =  req.body.current_user_id;
            const user = await this.repository.findById(id)
            if(!user) 
                return ResponseHelper.clienteError(
                    res, 
                    ClienteError.NotFound, 
                    "usuário inexistente"
                );
            if(id!= currentUserId && !user.is_super_user) {
                return ResponseHelper.clienteError(
                    res, 
                    ClienteError.Unauthorized, 
                    "o usuário autenticado não tem permissão para excluir outro usuário"
                );
            }
            await this.repository.delete(id);
            ResponseHelper.success(res, Success.Ok, 'Usuário deletado com sucesso')
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao excluir usuário');
        }
    }

    protected async getCleanParamsToCreate(req: Request): Promise<User|CustomResponse>{
        
        const currentUserId =  req.body.current_user_id;
        let isSuperUser = req.body.is_super_user;
        
        const countUsers = await this.repository.count()
       
        if(!currentUserId && countUsers.total == 0){
            isSuperUser = true;
        }else if(currentUserId){
            const currentUser = await this.repository.findById(currentUserId)
            if(!currentUser.is_super_user){
                const customResponse: CustomResponse = {
                    type: ResponseType.Error,
                    code: ClienteError.Unauthorized,
                    message: "o usuário autenticado não tem permissão para cadastrar outro usuário"
                }
                return customResponse;
            }
        }else{
            const customResponse: CustomResponse = {
                type: ResponseType.Error,
                code: ClienteError.Unauthorized,
                message: "apenas superusuários autenticados podem cadastrar outros usuários"
            }
            return customResponse;
        }

        const name =  req.body.name;
        const email =  req.body.email;
        const password =  req.body.password;

        const user: User={
            name: name,
            email:email,
            password: password,
            is_super_user:isSuperUser
        }
        return user;
    }

    protected async getCleanParamsToEdit(req: Request):Promise<User|CustomResponse>{

        const id = parseInt(req.params.id);
        const currentUserId =  req.body.current_user_id;
        let isSuperUser = req.body.is_super_user;

        if(currentUserId != id){
            const currentUser = await this.repository.findById(currentUserId)
            if(!currentUser.is_super_user){
                const customResponse: CustomResponse = {
                    type: ResponseType.Error,
                    code: ClienteError.Unauthorized,
                    message: "o usuário autenticado não tem permissão para atualizar outro usuário"
                }
                return customResponse;
            }
        }
        const oldUser = await this.repository.findById(id)
        if(oldUser.id = currentUserId && !oldUser.is_super_user && isSuperUser) {
            const customResponse: CustomResponse = {
                type: ResponseType.Error,
                code: ClienteError.Unauthorized,
                message: "um usuário não pode se autopromover a superusuário"
            }
            return customResponse;
        }

        const name =  req.body.name;
        const email =  req.body.email;
        const password =  req.body.password;

        const user: User={
            name: name,
            email:email,
            password: password,
            is_super_user:isSuperUser
        }
        return user;
    }

}
