import {Request, Response} from 'express';
import { User } from '../entities';
import { ClienteError, ResponseHelper, ServerError, Success } from '../helpers';
import { UsersRepository } from '../repositories';
import { Controller } from './Controller';

export class UsersController extends Controller<User>{

    constructor(connection: any){
        super(new UsersRepository(connection))
    }

    public async login(req:Request, res:Response){
        try{
            const email = req.body.email;
            const password = req.body.password
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
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro logar');
        }
    }

    public async all(req: Request, res:Response){
        try{
            const users = await this.repository.all();
            ResponseHelper.dataList(res, users);
        }catch(e:any){
            console.log(e)
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro buscar usuários');
        }
    }

    public async create(req: Request, res:Response){
        try{
            const currentUserId =  req.body.current_user_id;
            let isSuperUser = req.body.is_super_user;
            const countUsers = await this.repository.count()
            if(!currentUserId && countUsers.total == 0){
                isSuperUser = true;
            }else if(currentUserId){
                const currentUser = await this.repository.findById(currentUserId)
                if(!currentUser.is_super_user) return ResponseHelper.clienteError(res, ClienteError.Unauthorized, "o usuário autenticado não tem permissão para cadastrar outro usuário") 
            }else{
                return ResponseHelper.clienteError(
                    res, 
                    ClienteError.Unauthorized, 
                    "apenas superusuários autenticados podem cadastrar outros usuários"
                ) 
            }

            const name =  req.body.name;
            const email =  req.body.email;
            const password =  req.body.password;

            const user: User={
                name: name,
                email:email,
                password: password,
                is_super_user: isSuperUser
            }

            await this.repository.create(user);
            ResponseHelper.success(res, Success.Created, 'Usuário cadastrada com sucesso')
        
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O email do usuário deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao cadastrar usuário');
        }
    }

    public async edit(req: Request, res:Response){
        try{
            let id =  parseInt(req.params.id);

            const currentUserId =  req.body.current_user_id;
            let isSuperUser = req.body.is_super_user;

            if(currentUserId != id){
                const currentUser = await this.repository.findById(currentUserId)
                if(!currentUser.is_super_user){
                    return ResponseHelper.clienteError(
                        res, 
                        ClienteError.Unauthorized, 
                        "o usuário autenticado não tem permissão para atualizar outro usuário"
                    );
                }
            }
            const oldUser = await this.repository.findById(id)
            if(oldUser.id = currentUserId && !oldUser.is_super_user && isSuperUser) {
                return ResponseHelper.clienteError(
                    res, 
                    ClienteError.Unauthorized, 
                    "um usuário não pode se autopromover a superusuário"
                );
            }

            const name =  req.body.name;
            const email =  req.body.email;
            const password =  req.body.password;

            const user: User={
                name: name,
                email:email,
                password: password,
                is_super_user: isSuperUser
            }

            await this.repository.edit(id, user);
            ResponseHelper.success(res, Success.Created, 'Usuário editado com sucesso')
        }catch(e:any){
            console.log(e)
            if(e.code == 'ER_DUP_ENTRY'){
                ResponseHelper.clienteError(res,ClienteError.BadRequest,'O email do usuário deve ser único');
                return;
            }
            ResponseHelper.serverError(res, ServerError.InternalServerError, 'Ocorreu um erro ao editar usuário');
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

}
